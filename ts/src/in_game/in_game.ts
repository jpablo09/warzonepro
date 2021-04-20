import { AppWindow } from "../AppWindow";
import {
  OWGamesEvents,
  OWHotkeys
} from "@overwolf/overwolf-api-ts";
import { interestingFeatures, hotkeys, windowNames, warzoneClassId } from "../consts";
import WindowState = overwolf.windows.WindowStateEx;
declare function require(name:string);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// The window displayed in-game while a Warzone game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private _wzGameEventsListener: OWGamesEvents;
  private _eventsLog: HTMLElement;
  private _infoLog: HTMLElement;

  private constructor() {
    super(windowNames.inGame);

    this._eventsLog = document.getElementById('eventsLog');
    this._infoLog = document.getElementById('infoLog');

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();

    this._wzGameEventsListener = new OWGamesEvents({
      onInfoUpdates: this.onInfoUpdates.bind(this),
      onNewEvents: this.onNewEvents.bind(this)
    },
      interestingFeatures);
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public run() {
    this._wzGameEventsListener.start();
  }

  private onInfoUpdates(info) {
    this.logLine(this._infoLog, info, false);
  }

  // Special events will be highlighted in the event log
  private onNewEvents(e) {
    const shouldHighlight = e.events.some(event => {
      switch (event.name ) {
        case 'kill':
        case 'death':
        case 'matchStart':
        case 'matchEnd':
          return true;
      }

      return false
    });
    this.logLine(this._eventsLog, e, shouldHighlight);
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const hotkeyText = await OWHotkeys.getHotkeyText(hotkeys.toggle, warzoneClassId);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async (hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent): Promise<void> => {
      console.log(`pressed hotkey for ${hotkeyResult.name}`);
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.restore();
      }
    }

    OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
  }

  // Appends a new line to the specified log
  private logLine(log: HTMLElement, data, highlight) {
    const playerKey = new Set();

    const line = document.createElement('pre');
    line.textContent = JSON.stringify(data);
    const {game_info, gep_internal, match_info} = data;

    if(gep_internal) {

      Object.keys(gep_internal).map((key, index) => {
        if (typeof (gep_internal[key]) === 'object') {
          Object.keys(gep_internal[key]).map(key2 => {
            console.log(`${key2}: ${gep_internal[key][key2]}`)
          })
        } else {
          console.log(`${key}: ${gep_internal[key]}`);
        }
      });

    }

    if(game_info) {

      Object.keys(game_info).map((key, index) => {
        if (typeof (game_info[key]) === 'object') {
          Object.keys(game_info[key]).map(key2 => {
            console.log(`${key2}: ${game_info[key][key2]}`)
          })
        } else {
          console.log(`${key}: ${game_info[key]}`);
        }
      });
    }




    if(match_info) {

      Object.keys(match_info).map((key, index) => {

        if (key.includes("roster")) {
          var rosterData = JSON.parse(match_info[key]);
          Object.keys(rosterData).map(key2 => {
            //console.log(`${key2}: ${rosterData[key2]}`);
            if(`${key2}` === "player") {
              var playerId = `${rosterData[key2]}`;
              if (!(playerKey.has(playerId))){
                playerKey.add(playerId);
                //console.log("player id: " , playerId);
                const xhr = new XMLHttpRequest();
                const url = "https://m7xiwxzju9.execute-api.us-east-2.amazonaws.com/insert_randoms/randominfo";
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                //xhr.setRequestHeader("Access-Control-Allow-Origin", "https://content.overwolf.com/anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe/");
                //xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
                //xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    console.log("xttpJson: " , json);
                  }
                };
                const data = JSON.stringify({"randPlayerId": playerId});
                console.log("data: " , data);
                xhr.send(data);

              }
            }
          })
        } else {
          console.log(`${key}: ${match_info[key]}`);
        }
      });

    }







    if (highlight) {
      line.className = 'highlight';
    }

    const shouldAutoScroll = (log.scrollTop + log.offsetHeight) > (log.scrollHeight - 10);

    log.appendChild(line);

    if (shouldAutoScroll) {
      log.scrollTop = log.scrollHeight;
    }
  }
}

InGame.instance().run();
