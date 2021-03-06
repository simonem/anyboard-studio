# Store

# ledgrid.js

## State

`workspace` saves the current state of the workspace. Every block that has been placed with all choices and where they are and how they connect.

`blocklyState` also saves the workspace, but in text format that isn't directly usable by Blockly but can be saved and later loaded.

`exportedCode` is deprecated. It was used in an earlier version to help export code.

## Mutations

`SET_WORKSPACE` sets state `workspace` to a new workspace.

`SAVE_BLOCKLY_STATE` sets state `blocklyState` to a new string.

`EXPORT_CODE` converts state `workspace` to javascript code, injects it into the index.html and uses the makeZip from helpers,
which adds relevant libraries. Then all of this is saved as a local zip file, containing a working Anyboard game.

`DOWNLOAD_CODE` saves state `blocklyState` to a local file.

`UPLOAD_CODE` is used to set state `blocklyState` to a string uploaded from a local file.
It does the same thing as `SAVE_BLOCKLY_STATE`, and is just used for different reasons in different actions.

## Getters

`GET_BLOCKLY_STATE` returns the state `blocklyState`

## Actions

`blocklyInit` sets up Blockly.
First it gathers all the information that `blockly-init` from helpers needs, and then calls that functions which sets up Blockly.
The information needed are the sectors defined in the Board editor and the tokens and grids defined in the Game Assets.
In this actions these are called sectorObject, tokenVal and ledGrids respectively.
For each of these, blockly-init also needs them in a second format, which is used for dropdown lists.
These modified formats are called sectorNames, TOKENS and GRIDS respectively.
All of this is given to `blockly-init` from utilities, which adds customised blocks and logic to Blockly.
For more detail check its own documentation.
With Blockly now suitably modified, it is injected into the blockly-wrapper div in `Blockly.vue` using the toolbox from `utilities/blockly-toolbox.js`.
The toolbox defines what blocks will be available in the tabs on the left of the workspace.
The workspace is set to save its state in the blockly store every time it is changed.
Finally, the state of blockly is loaded if it isn't empty. This is used if you return to the Code Builder tab from another tab.
In that case, Blockly will be built anew, and the `blocklyState` is loaded to restore what has already been done.

`exportCode` is used to convert the blocks in the workspace to a functioning zip containing all necessary game files by calling the corresponding mutation.

`downloadCode` is used to save the state of the workspace to a local file by calling the corresponding mutation.

`addCode` is used to add blocks to the workspace from a local file.

`loadCode` is used to replaced all current blocks in the workspace with blocks from a local file.


# fabric_canvas.js

fabric_canvas.js is a vuex store file for manipulating the fabric canvas object

## State

`canvas` is the fabric object made from a html5 canvas element which the store works against.

`canvasState` is the used to save and load the current state of the canvas.

`sectors` is a JSON-object where sectors placed by the user is stored.

`usedSectors` is a JSON-object containing both user defined and predefined sectors.

`sectorColor` is a hex string of the currently chosen sector color.

`drawLayer` is a string to store which layer the user is currently drawing on.

`minSize` is an int used to set the minimum size of a sector.

`activeObj` is an object of the currently selected object. If none is selected this is `null`.

`gridActive` is a boolean to say if snap to grid is active.

`gridActive` is a boolean to help say if the grid has been added or not to prevent redrawing it unnecessarily.

`gridSize` is an int of the snap to grid size.

`checkWidth` is an int used to check if the screen size has been changed since the last time the grid was viewed.

`checkHeight` is an int used to check if the screen size has been changed since the last time the grid was viewed.

`printableBoard` is used to store a printable version of the canvas object

## Mutations

As all mutations make changes to the state of the store, they all take `state` as an argument which allows them
to make these changes. In the following mutations `state` will not be explained to avoid repetition.

#### SET_CANVAS (state, payload)

Sets the state canvas to payload.

Used in `FabricCanvas.vue` to link the html5 element with the store.

#### INIT_DRAW (state)

Creates a drawing brush for the canvas, sets its size and color.

Used to initialise freedrawing for the canvas.

#### CREATE_RECT (state, color)

Creates a Fabric rectangle with the fill of the `color` argument. `stroke`, `strokeDashArray` and `strokeWidth` adds
a distinct border to the rectangle to indicate it's a sector. A name is set using the helper method `getColorName` which
sets a name based on the `color` argument.

The canvas is layerified, the new rectangle is renamed if there are other sectors of the same color 
already existing and then added to the canvas as the selected object.

`layerify` and `renameSameSector` are further documented in `helpers.js`


#### CREATE_POLYGON (state, properties)

Creates a Fabric polygon with the fill of the `color` attribute and number of `sides` found in the `properties`
argument. `stroke`, `strokeDashArray` and `strokeWidth` adds ba distinct border to the rectangle to 
indicate it's a sector.  A name is set using the helper method `getColorName` which sets a name based on the `color`
argument.

The canvas is layerified, the new polygon is renamed if there are other sectors of the same color 
already existing and then added to the canvas as the selected object.

`createPolyPoints`, `layerify` and `renameSameSector` are further documented in `helpers.js`

#### CREATE_RECT (state, color)

Creates a Fabric circle with the fill of the `color` argument. `stroke`, `strokeDashArray` and `strokeWidth` adds
a distinct border to the rectangle to indicate it's a sector. A name is set using the helper method `getColorName` which
sets a name based on the `color` argument.

The canvas is layerified, the new circle is renamed if there are other sectors of the same color 
already existing and then added to the canvas as the selected object.

`layerify` and `renameSameSector` are further documented in `helpers.js`

#### UPDATE_COLOR (state, payload)

Updates the store's sectorColor to the given payload.

#### CHANGE_COLOR (state)

Changes the color of the chosen object. `colorChange` is further documented in `helpers.js`

#### RENAME_SECTOR (state, payload)

Checks that the user isn't trying to rename a sector to the same name as another sector with a different color.
If none are found then it renames the sector and all sectors of the same color. If the chosen object is not a sector
then it renames only that object.

`checkIfSameName` and `renameSector` are further documented in `helpers.js`

#### INSERT_TEXT (state)

Creates a Fabric interactive text object, adds it to the canvas, layerifies the canvas and sets the text as the
selected object.

`layerify` is further documented in `helpers.js`

#### CHANGE_WIDTH (state, payload)

Changes the width of the free drawing brush to the payload and parses it to an `int` to avoid pathing errors.

#### CHANGE_DRAW_COLOR (state, payload)

Changes the colour of the free drawing brush to the payload.

#### CHANGE_DRAW_LAYER (state)

Swaps the current drawing layer between the top and bottom layers. The layers define if the user is drawing over or
under sectors.

#### DELETE_OBJECT (state)

Checks if there is a selected object and deletes the currently selected object if one is found, then layerifies the
canvas.

`layerify` is further documented in `helpers.js`

#### CLEAR_CANVAS (state)

Clears the entire canvas, sets the background back to white and rerenders it. Sets `gridAdded` to false to allow
it to be redrawn after being cleared.

#### CLONE_OBJECT (state)

Checks if there is a selected object to clone. If one is found the method checks if the fabric object is async or not,
which is required to properly clone `path` objects, which are created from free drawing. The method then clones the
selected object, adds it to the canvas and then layerifies the canvas.

`layerify` is further documented in `helpers.js`

#### CENTER_OBJECT (state)

If an object is chosen the method centers it on the canvas, updates the coordinates to allow to to be properly moved
afterwards and then layerifies the canvas.

`layerify` is further documented in `helpers.js`

#### BRING_FORWARD (state)

Brings the selected object forward and then layerifies the canvas.

`layerify` is further documented in `helpers.js`

#### SEND_BACKWARD (state)

Sends selected object backward and then layerifies the canvas.

`layerify` is further documented in `helpers.js`

#### BRING_TO_FRONT (state)

Brings the selected object to the front and then layerifies the canvas.

`layerify` is further documented in `helpers.js`

#### SEND_TO_BACK (state)

Sends the selected object to the back and then layerifies the canvas.

`layerify` is further documented in `helpers.js`


#### UPLOAD_IMAGE (state, file)

Creates a filereader, and when the file reader loads it adds a Fabric image to the canvas created from the uploaded
file. The object's name is set to the file name without its extension and then  the method layerifies the canvas.

`layerify` is further documented in `helpers.js`

#### UPDATE_ACTIVEOBJ (state)

Updates the states `activeobj` to the selected object, or `null` if no object is selected.

#### SAVE_BOARD (state)

Used to download the board as a .png file. First the method hides the grid, deactivates all objects, creates dataURL
from the canvas and finally turns the dataURL into a blob with `dataURLtoBlob` before downloading the image. The grid
is then reactivated if it was active before saving the image.

`dataURLtoBlob` is further documented in `helpers.js`

#### MAKE_PRINTABLE_BOARD (state)

Used to create a dataurl which can be directly used to be printed. First the method hides the grid, deactivates all
objects and creates a dataURL from the canvas. It then reactivates the grid if it was active before making the
printable board.

#### DOWNLOAD_BOARD (state)

Used to download the state of the canvas in JSON-format. The method creates a blob from the stringified state of the
canvas and then downloads it.


#### UPLOAD_BOARD (state, payload)

Used when the user uploads a board in JSON-format. The canvasState is set to the payload.

#### SAVE_STATE (state)

Method used to save the current state of the board to the store. Custom attributes are added to make sure they are
saved properly.

#### LOAD_STATE (state)

If the state is not 0, which it is on initialisation, it loads the state. The method also sets the background color
to white properly render the board.

#### SAVE_SECTORS (state)

Saves the sectors that have been added to the board.

`exportSectors` is further documented in `helpers.js`

#### USED_SECTORS (state)

Updates the object of sectors which includes both predefined and user defined sectors.

`updateSectorList` is further documented in `helpers.js`

#### CHANGE_GRID_MODE (state)

Changes the snap to grid mode between activated and deactivated.

#### HANDLE_DRAW_GRID (state)

Makes sure that the grid is shown or not shown properly when changing views. If this method is not used then the grid
may be visible after swapping view even if the snap to grid mode is not active


#### CHANGE_GRID_SIZE (state, payload)

Changes the snap to grid size to the payload.

#### ADD_GRID (state)

Draws the snap to grid onto the canvas if it has not already been drawn or if the screen size has changed since the last
time the canvas was mounted, and makes the grid unselectable or changeable.
It then layerifies the board to make sure the grid is always on the bottom of the objects.

`layerify` is further documented in `helpers.js`

#### UNADD_GRID (state)

A method to set the `gridAdded` state to false.

## Actions

All actions have `{commit}` as an argument, which is used to call mutations. In the following actions `{commit` will
not be explained to avoid repetition. Most of the actual changes are done within the mutations, while these actions
are used to call one or more mutations.

#### setCanvas ({commit}, payload)

Initialises the canvas on load. Payload is the html5 canvas element from `FabricCanvas.vue`. This also loads the
board if there is a saved state in the store.

#### createShape ({commit, state}, type)

Creates shapes calling create mutations depending on the `type` argument. The color used in each mutation is the
currently stored `sectorColor`.

#### updateColor ({commit, getters, dispatch}, color)

Used to update the store `sectorColor` to the `color` argument. If an sector or path is selected it will also change
the color of that object. Finally it changes the free drawing color to the `color` argument.

#### renameSector ({commit}, name)

Renames the currently selected object to the `name` argument, then updates the relevant states.

#### changeColor ({commit})

Changes the color of the selected sector or path, then updates the relevant states.

#### insertText ({commit})

Inserts interactive text onto the board.

#### changeWidth ({commit}, width)

Changes the width of the free drawing brush to `width`.

#### changeDrawLayer ({commit})

Changes the drawLayer between 'top' and 'bottom'.

#### changeDrawColor ({commit}, color)

Changes the free drawing brush color to `color`.

#### deleteObject ({commit})

Deletes the currently selected object.

#### clearCanvas ({commit})

Clears the canvas, readds the grid and updates the relevant states.

#### cloneObject ({commit})

Clones the currently selected object.

#### centerObject ({commit})

Centers the currently selected board on the canvas.

#### arrangeObject ({commit}, type)

Calls the different arrange mutations depending on the `type` given.

#### uploadImage ({commit}, file)

Uploads an image onto the board from `file`.

#### updateActiveObj ({commit})

Updates the currently active object.

#### saveBoard ({commit})

The user saves the board as a png file.

#### makePrintableBoard ({commit})

Used to make a printable format of the board.

#### downloadBoard ({commit})

Used to download the board in JSON-format.

#### uploadBoard ({commit}, board)

Used for the user to upload a board in JSON-format, then renders the board.

#### stateHandling ({commit})

Used to update states when changes are made to the board.

#### loadState ({commit})

Used to load the board state.

#### changeGridMode ({commit})

Used to change the grid between active and inactive.

#### updateGridSize ({commit}, size)

Used to update the grid size to `size`.

#### changeGridSize ({commit}, size)

Used to change the grid size to `size` and redraw it. It removes the currently drawn grid, updates the size
and then redraws it on the board.

## Getters

The getters are used to access the state of the store. All of the getters in this file returns the value stored
in states.


# fabric_inspector.js

fabric_inspector.js is a vuex store
file for manipulating the fabric inspector object 

## States

 `sectors` is the list of sectors that are displayed in the Sector list.
 
 `activeColor` is a hex string of the color that is currently set to active.

 All of the following states are used to hold various information
  about a object and is displayed in the Object properties
 
 `height` contains the height of a object in the form of a float value
 
 `width` contains the width of a object in the form of a float value
 
 `type` contains the type of a object (circle, rectangle, etc) in the form of a string
 
 `fill` contains the color of a object in the form of a hex string
 
 `name` contains the name of a object in the form of a string
 
 `stroke` contains the objects border color in the form of a hex string
 
 `strokedasharray` contains the properties regarding the objects border (distance between each border section and length of each section) in the form of a array with gap and length
 
 `strokewidth` contains the width of a objects border in the form of a float
 
 `minwidth` contains the minimum width that a object must have in the form of a float
 
 `minheight` contains the minimum height that a object must have in the form of a float

## Mutations

All of the following mutations take in a `state` and a `payload`.
Some specified value in the `state` is set to the value of `payload`.

#### SET_PREDEFINED_SECTORS (state, payload)

Sets the state `sectors` to `payload`.

Used to set the predefined sectors.

#### SET_HEIGHT (state, payload)

Sets the state `height` to `payload`.

Used to set the height of a object.

#### SET_WIDTH (state, payload)

Sets the state `width` to `payload`.

Used to set the width of a object.


#### SET_TYPE (state, payload)

Sets the state `type` to `payload`.

Used to set the type of a object.

#### SET_FILL (state, payload)

Sets the state `fill` to `payload`.

Used to set the color of a object.


#### SET_NAME (state, payload) 

Sets the state `name` to `payload`.

Used to set the name of a object.


#### SET_STROKE (state, payload)

Sets the state `stroke` to `payload`.
 
Used to set the color of a objects border.

#### SET_STROKE_DASH_ARRAY (state, payload)

Sets the state `strokedasharray` to `payload`.

Used to set the values of a objects strokedasharray.
    
#### SET_STROKE_WIDTH (state, payload) 

Sets the state `strokewidth` to `payload`.

Used to set the width of a objects border.

#### SET_MIN_WIDTH (state, payload)

Sets the state `minwidth` to `payload`.

Used to set the minimum required width of a object.

#### SET_MIN_HEIGHT (state, payload)

Sets the state `minheight` to `payload`.

Used to set the minimum required height of a object.

#### SET_PROPER_COLOR (state, payload)

Sets the state `activecolor` to `payload`.

Used to set the selected color to active color. 

## Actions

All actions have `{commit}` as an argument, which is used to call mutations. Many of the actions in this store are
self explanatory and are only use to call a single mutation. These will not be explained.

#### updateInfo ({commit}, activeObj)

updateInfo is used to invoke numerous mutations that update the 
object properties list. Conditional statements are used to check what type of object is 
currently selected and decide which mutations should be called.





# ledgrid.js

## State

### Grid

`grid` saves the current state of the LED grid in `LEDGridEditor.vue` as an array of boolean values.

`savedGrids` is an object containing the saved LED grids. The name of each grid is used as the key, 
and the value is a 16-bit hexadecimal string that represents the grid.

`selectedGrid` is the currently selected grid in `LEDGridEditor.vue`. An empty string means no grid has been selected.

### Mutations

`SET_GRID` sets the state `grid` to a new grid.

`CLEAR_GRID` sets state `grid` to a grid with only false values.

`PUSH_TO_SAVEDGRIDS` appends a new grid to `savedGrids` in the state.

`UPDATE_GRID` updates the values of an already saved grid.

`SELECT_GRID` is used to set a new grid as `selectedGrid`

`DELETE_GRID` deletes a grid from `savedGrids`

`DOWNLOAD_GRIDS` creates a `.json`-file out of savedGrids so that the user can download their progress.

`UPLOAD_GRIDS` replaces `savedGrids` with a different set of saved grids. 
This is used if a users wishes to upload grids from a `.json`-file

### Actions

`setGrid` transforms a 16-bit hexadecimal string to a 64-bit binary string and uses it to set new values for the state `grid`

`changeGrid` is used to invert the value of an index in the state `grid`

the remaining actions are used as intermediate steps dispatched from `LEDGridEditor.vue` and calls mutators inside the store.


# token.js

## State

The token store contains state data pertaining the currently selected token.

`savedTokens` is a list of saved Tokens. Tokens are saved as objects, where the token's name serves as the object's key,
and the value is an array where the first value always is an array of RGB-values for the LED light, and other values in the array are allowed actions and haptics for the token.

`numberOfDynamicTokens` records the number of dynamic tokens created.

`selectedToken` keeps track of the currently selected token. If no token is currently selected, the value is an empty string.

`LEDColor` is a hex-string representing the color currently selected for the currently selected token.

`attributes` is an object containing boolean values for the haptics and actions of the currently selected token.

### Mutations

`CHANGE_LED_COLOR` updates the state's LEDColor.

`UPDATE_TOKEN_ATTRIBUTE` toggles an attribute in the state between true or false

`ADD_NEW_TOKE` generates a new token object and appends it to `savedTokens`.

`UPDATE_TOKEN` updates the currently selected token

`SET_TOKEN` is used by Asset.vue to set the `selectedToken`

`SET_STANDARD` is used as a helper function to reset the values to "default" values, where the LED color is green and all the attributes are true.

`DELETE_TOKEN` removes the selected token from `savedTokens`

`DOWNLOAD_TOKENS` creates a Blob-object and saves the `savedTokens` as a `.json`-file

`UPLOAD_TOKENS` is used to upload saved tokens from a `.json`-file. This function replaces the currently saved tokens with the tokens from the `.json`-file.

### Actions

The actions of the `token.js` store call mutations in different orders to propagate application behavior.

### Getters

The two getters `GET_SAVEDTOKENS` and `GET_SELECTEDTOKEN` are used by other components in the application to load data created with `TokenEditor.vue`
