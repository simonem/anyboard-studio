import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var htmlTemplate = ''
htmlTemplate += '<!DOCTYPE html>\n'
htmlTemplate += '<html>\n'
htmlTemplate += '<head>\n'
htmlTemplate += '  <meta charset="utf-8" />\n'
htmlTemplate += '  <meta name="viewport" content="width=device-width, user-scalable=no\n'
htmlTemplate += ' initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />\n'
htmlTemplate += '\n'
htmlTemplate += '  <title>AnyboardGameDemo</title>\n'
htmlTemplate += '\n'
htmlTemplate += '  <style>\n'
htmlTemplate += '    @import \'ui/css/evothings-app.css\';\n'
htmlTemplate += '  </style>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- cordova.js based -->\n'
htmlTemplate += '  <script src="cordova.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- AnyboardJS libraries -->\n'
htmlTemplate += '  <script src="dist/anyboard.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- Bluetooth driver and dependencies-->\n'
htmlTemplate += '  <script src="libs/evothings/evothings.js"></script>\n'
htmlTemplate += '  <script src="libs/evothings/easyble/easyble.js"></script>\n'
htmlTemplate += '  <script src="drivers/discovery.evothings.bluetooth.js"></script>\n'
htmlTemplate += '  <script src="drivers/bean.evothings.bluetooth.js"></script>\n'
htmlTemplate += '  <script src="drivers/rfduino.evothings.bluetooth.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <!-- We\'ve used jquery for quick development -->\n'
htmlTemplate += '  <script src="libs/jquery-1.11.3.min.js"></script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <script>\n'
htmlTemplate += '    $(document).ready(function(){\n'
htmlTemplate += '      $("#summary").show();\n'
htmlTemplate += '      $("#main").hide();\n'
htmlTemplate += '      app.initiate();\n'
htmlTemplate += '    });\n'
htmlTemplate += '  </script>\n'
htmlTemplate += '\n'
htmlTemplate += '  <script>\n'
htmlTemplate += '    var app;\n'
htmlTemplate += '    app = {\n'
htmlTemplate += '      currentColor: "some value",\n'
htmlTemplate += '      devices: {},\n'
htmlTemplate += '      currentTile: "white",\n'
htmlTemplate += '\n'
htmlTemplate += '      locations: {\n'
htmlTemplate += '        2: \'#166CA0\',  // 2\n'
htmlTemplate += '        5: \'#4194D0\',  // 5\n'
htmlTemplate += '        7: \'#112A95\',  // 7\n'
htmlTemplate += '        14: \'#C047A3\',  // 14\n'
htmlTemplate += '        15: \'#FB50A6\', // 15\n'
htmlTemplate += '        16: \'#5E1014\',  // 16\n'
htmlTemplate += '        18: \'#9B3235\',  // 18\n'
htmlTemplate += '        20: \'#FF483E\',  // 20\n'
htmlTemplate += '        21: \'#66C889\',  // 21\n'
htmlTemplate += '        24: \'#30A747\', // 24\n'
htmlTemplate += '        30: \'#31682E\',  // 30\n'
htmlTemplate += '        31: \'#FF9344\',  // 31\n'
htmlTemplate += '        33: \'#D96623\',  // 33\n'
htmlTemplate += '        36: \'#F6EA77\',  // 36\n'
htmlTemplate += '        37: \'#F4E658\'   // 37\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      //REPLACEMEOKAY//\n'
htmlTemplate += '\n'
htmlTemplate += '      // Discover bluetooth tokens in proximity\n'
htmlTemplate += '      discover: function () {\n'
htmlTemplate += '        var self = this;\n'
htmlTemplate += '        AnyBoard.TokenManager.scan(\n'
htmlTemplate += '          // success function to be executed upon _each_ token that is discovered\n'
htmlTemplate += '          function (token) {\n'
htmlTemplate += '            self.addDiscovered(token);\n'
htmlTemplate += '          },\n'
htmlTemplate += '          // function to be executed upon failure\n'
htmlTemplate += '          function (errorCode) {\n'
htmlTemplate += '            console.log(errorCode)\n'
htmlTemplate += '          }\n'
htmlTemplate += '        );\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Function to be executed upon having discovered a token\n'
htmlTemplate += '      addDiscovered: function (token) {\n'
htmlTemplate += '        if (!this.devices[token.name]) {\n'
htmlTemplate += '          this.devices[token.name] = token;\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add button for token to body\n'
htmlTemplate += '          //document.body.innerHTML += \'<button type="button" id="\' + token.name + \'" onclick="app.connect(\' + "\'" + token.name + "\'" + \')" class="grey">\' + token.name + \' </button><br />\';\n'
htmlTemplate += '          $("#summary").append(\'<button type="button" id="\' + token.name + \'" onclick="app.connect(\' + "\'" + token.name + "\'" + \')" class="grey">\' + token.name + \' </button><br />\');\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add listener to be executed if the token connects\n'
htmlTemplate += '          token.on(\'connect\', function () {\n'
htmlTemplate += '            document.getElementById(token.name).className = \'green\';\n'
htmlTemplate += '            $("#token_feedback").append(\'<button type="button" onclick="app.pickRandomColor()"class="indicator3"> Pick random color</button><br />\');\n'
htmlTemplate += '            $("#token_feedback").append(\'<button type="button" onclick="app.verifyColor(\' + "\'" + token.name + "\'" + \')"class="indicator3"> Verify color</button><br />\');\n'
htmlTemplate += '          });\n'
htmlTemplate += '\n'
htmlTemplate += '          // Add listener to be executed if the token disconnects\n'
htmlTemplate += '          token.on(\'disconnect\', function () {\n'
htmlTemplate += '            document.getElementById(token.name).className = \'red\';\n'
htmlTemplate += '          });\n'
htmlTemplate += '        }\n'
htmlTemplate += '\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Attempts to connect to token.\n'
htmlTemplate += '      connect: function (tokenName) {\n'
htmlTemplate += '        var token = this.devices[tokenName];\n'
htmlTemplate += '\n'
htmlTemplate += '        // If already connecting, stop\n'
htmlTemplate += '        if (document.getElementById(tokenName).className == \'blue\')\n'
htmlTemplate += '          return;\n'
htmlTemplate += '\n'
htmlTemplate += '        // If already connected, attempt to send green led command\n'
htmlTemplate += '        if (document.getElementById(tokenName).className == \'green\') {\n'
htmlTemplate += '          this.sendVibrationCmd(token);\n'
htmlTemplate += '          return;\n'
htmlTemplate += '        }\n'
htmlTemplate += '\n'
htmlTemplate += '        // Signal that we\'re attempting to connect\n'
htmlTemplate += '        document.getElementById(tokenName).className = \'blue\';\n'
htmlTemplate += '        // Send connect command.\n'
htmlTemplate += '        token.connect(app.next_panel());\n'
htmlTemplate += '\n'
htmlTemplate += '        // Add button for token to body\n'
htmlTemplate += '        //$("#summary").append(\'<button type="button" onclick="app.next_panel()" class="black"> Next </button>\');\n'
htmlTemplate += '\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      // Send green led command. Works on every token with a AnyBoard compatible driver and firmware.\n'
htmlTemplate += '      sendVibrationCmd: function (token) {\n'
htmlTemplate += '\n'
htmlTemplate += '        // Function to be executed when LED is successfully turned on\n'
htmlTemplate += '        var completedFunction = function (data) {\n'
htmlTemplate += '          hyper.log("We happily send the VIBRATE command");\n'
htmlTemplate += '          hyper.log(data)\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        // Function to be executed upon failure of LED\n'
htmlTemplate += '        var errorCallback = function (errorMsg) {\n'
htmlTemplate += '          hyper.log("Failed to send the VIBRATE command");\n'
htmlTemplate += '          hyper.log(errorMsg);\n'
htmlTemplate += '        };\n'
htmlTemplate += '\n'
htmlTemplate += '        // Turns on token led.\n'
htmlTemplate += '        if(app.tokenVal.hasOwnProperty(token.id)) {\n'
htmlTemplate += '          if (!(app.tokenVal[token.id].includes(\'vibrate\'))) {\n'
htmlTemplate += '            token.vibrate([100], // Instead of "green" color, on could also use array, e.g. [0, 255, 0]\n'
htmlTemplate += '              completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '              errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '            );\n'
htmlTemplate += '          }\n'
htmlTemplate += '        } else {\n'
htmlTemplate += '          token.vibrate([100], // Instead of "green" color, on could also use array, e.g. [0, 255, 0]\n'
htmlTemplate += '            completedFunction,  // function to be executed when token signals\n'
htmlTemplate += '            errorCallback  // function to be executed in case of failure to send command to token\n'
htmlTemplate += '          );\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      next_panel: function () {\n'
htmlTemplate += '        $("#summary").hide();\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      pickRandomColor: function () {\n'
htmlTemplate += '        var currentColor = this.locations[Math.floor(Math.random() *15 + 1)]\n'
htmlTemplate += '        if (currentColor == this.currentColor) {\n'
htmlTemplate += '          this.pickRandomColor();\n'
htmlTemplate += '        }\n'
htmlTemplate += '        else {\n'
htmlTemplate += '          this.currentColor = currentColor;\n'
htmlTemplate += '          $(\'.wanted_tile\').css("background-color", this.currentColor);\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      sendVibration: function (tokenName) {\n'
htmlTemplate += '        var token = this.devices[tokenName];\n'
htmlTemplate += '        this.sendVibrationCmd(token)\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      verifyColor: function (tokenName) {\n'
htmlTemplate += '        var token = this.devices[tokenName];\n'
htmlTemplate += '        if (app.tiles[2] == this.currentColor) {\n'
htmlTemplate += '          this.sendVibrationCmd(token);\n'
htmlTemplate += '          this.updateScore();\n'
htmlTemplate += '          document.getElementById("pleaseTilt")\n'
htmlTemplate += '            .appendChild(\n'
htmlTemplate += '              document.createTextNode(\n'
htmlTemplate += '                "Please tilt the pawn to recieve a new color."\n'
htmlTemplate += '              )\n'
htmlTemplate += '            );\n'
htmlTemplate += '        }\n'
htmlTemplate += '        else {\n'
htmlTemplate += '          this.downgradeScore();\n'
htmlTemplate += '        }\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      showScore: function () {\n'
htmlTemplate += '        $("#message").html("Current score is " + this.score.toString());\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      showCurrentTile: function (color) {\n'
htmlTemplate += '        $(\'.current_tile\').css("background-color", color);\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getSector: function (token) {\n'
htmlTemplate += '        for (var key in this.devices){\n'
htmlTemplate += '          if (this.devices[key] == token){\n'
htmlTemplate += '            return this.devices[key].sector;\n'
htmlTemplate += '          }\n'
htmlTemplate += '        }\n'
htmlTemplate += '        return false;\n'
htmlTemplate += '      },\n'
htmlTemplate += '\n'
htmlTemplate += '      getRandomToken: function () {\n'
htmlTemplate += '        var obj_keys = Object.keys(app.devices);\n'
htmlTemplate += '        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];\n'
htmlTemplate += '        return app.devices[ran_key];\n'
htmlTemplate += '      }\n'
htmlTemplate += '\n'
htmlTemplate += '    };\n'
htmlTemplate += '  </script>\n'
htmlTemplate += '</head>\n'
htmlTemplate += '\n'
htmlTemplate += '<body ontouchstart="">\n'
htmlTemplate += '<div id="summary">\n'
htmlTemplate += '  <h1>AnyboardGameDemo</h1>\n'
htmlTemplate += '  <button type="button" class="black" onclick="app.discover()">\n'
htmlTemplate += '    Discover Bluetooth devices\n'
htmlTemplate += '  </button>\n'
htmlTemplate += '</div>\n'
htmlTemplate += '<div id="token_feedback"></div>\n'
htmlTemplate += '<div id="token_constraint">\n'
htmlTemplate += '  <h1>Colors</h1>\n'
htmlTemplate += '  <div id="scorediv">\n'
htmlTemplate += '    <p id="score">Current score is 0</p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="messagediv">\n'
htmlTemplate += '    <p id="message1"></p>\n'
htmlTemplate += '    <p id="message2"></p>\n'
htmlTemplate += '    <p id="message3"></p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="numberdiv">\n'
htmlTemplate += '    <p id="number1"></p>\n'
htmlTemplate += '    <p id="number2"></p>\n'
htmlTemplate += '    <p id="number3"></p>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '\n'
htmlTemplate += '  <div id="tileContainer">\n'
htmlTemplate += '\n'
htmlTemplate += '    <div class="tile">\n'
htmlTemplate += '      <p>Current tile</p>\n'
htmlTemplate += '      <div id="color" class="current_tile"></div>\n'
htmlTemplate += '    </div>\n'
htmlTemplate += '\n'
htmlTemplate += '    <div class="tile">\n'
htmlTemplate += '      <p>Wanted tile</p>\n'
htmlTemplate += '      <div id="color" class="wanted_tile"></div>\n'
htmlTemplate += '    </div>\n'
htmlTemplate += '  </div>\n'
htmlTemplate += '</div>\n'
htmlTemplate += '</body>\n'
htmlTemplate += '\n'
htmlTemplate += '</html>\n'

const store = new Vuex.Store({
  state: {
    htmlTmp: htmlTemplate
  },
  actions: {
    SAVE_HTML: function ({commit}, templ) {
      commit('SET_HTML', templ)
    }
  },
  mutations: {
    SET_HTML: (state, templ) => {
      state.htmlTmp = templ
    }
  },
  getters: {
    GET_HTML: state => {
      return state.htmlTmp
    }
  },
  modules: {

  }
})
export default store
