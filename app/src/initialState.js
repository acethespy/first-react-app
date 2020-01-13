const initialState = {
  formations: {
      '0': {},
      '1': {},
      '2': {},
  },
  dancers: {},
  metadata: {
      currentFormationId: '0',
  }
}

/*
testValue: 0,
formations: {
    '0': {},
    '1': {},
    '2': {},
},
dancers: {},
formationOrder: ['0', '1', '2'],
nextId: 0,
nextFormId: 3,
currentFormId: '0',
*/

/*
App {
    currentFormationID
	formations {
    	formation {
    		dancers {
    			dancer {
    				name
    				position x
    				position y
    			}
    		}
	    }
	}
}
*/

export default initialState;
