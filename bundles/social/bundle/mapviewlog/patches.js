Oskari.clazz.category("Oskari.mapframework.bundle.statehandler.StateHandlerBundleInstance", 'hacks', {

	historyMoveNth : function(n) {
		var me = this, sandbox = me.getSandbox();
		/* pops current state */
		var state = me._historyPrevious[n];
		/* currentstate */
		if (!state) {
			return;
		}
		/*this._historyNext = [];*/
		/*this._historyPrevious = this._historyPrevious.slice(0,Math.max(n-1,0));*/
		var mapmodule = sandbox.findRegisteredModuleInstance('MainMapModule');
		var currentState = this._getMapState();
		me._historyEnabled = false;
		me._setMapState(mapmodule, state, currentState);
		me._historyEnabled = true;

		if (!me._historyContentEventBuilder) {
			me._historyContentEventBuilder = me.sandbox.getEventBuilder("statehandler.HistoryContent");
		}
		if (!me._historyContentEvent) {
			me._historyContentEvent = me._historyContentEventBuilder(state, me._historyPrevious);
		}
		me.sandbox.notifyAll(me._historyContentEvent, true);

	},

	_pushState : function() {
		var me = this;
		if (me._historyEnabled) {
			var history = me._historyPrevious;

			var state = this._getMapState();

			var prevState = history.length == 0 ? null : history[history.length - 1];
			var cmpResult = me._compareState(prevState, state, true);
			if (cmpResult.result) {
				me.sandbox.printDebug("[StateHandler] PUSHING state");
				state.rule = cmpResult.rule;
				me._historyPrevious.push(state);
				me._historyNext = [];

				state.maplinkArgs = me.getSandbox().generateMapLinkParameters();
				state.timestamp = (new Date()).getTime();

				if (me.conf && me.conf.logUrl) {
					me._logState();
				}

				if (!me._historyContentEventBuilder) {
					me._historyContentEventBuilder = me.sandbox.getEventBuilder("statehandler.HistoryContent");
				}
				if (!me._historyContentEvent) {
					me._historyContentEvent = me._historyContentEventBuilder(state, me._historyPrevious);
				}
				me.sandbox.notifyAll(me._historyContentEvent, true);
			}
		}
	},

	historyMovePrevious : function() {
		var me = this, sandbox = me.getSandbox();
		switch(this._historyPrevious.length) {
			case 0:
				/* hard reset */
				/*this.resetState();*/
				break;
			case 1:
				/* soft reset (retains the future) */
				var nextHistory = this._historyNext;
				this.resetState();
				this._historyNext = nextHistory;
				break;
			default:
				/* pops current state */
				var cstate = this._historyPrevious.pop();
				/* currentstate */
				this._historyNext.push(cstate);
				var state = this._historyPrevious[this._historyPrevious.length - 1];
				var mapmodule = sandbox.findRegisteredModuleInstance('MainMapModule');
				var currentState = this._getMapState();
				this._historyEnabled = false;
				this._setMapState(mapmodule, state, currentState);
				this._historyEnabled = true;
				/*state.timestamp = (new Date()).getTime();*/

				if (!me._historyContentEventBuilder) {
					me._historyContentEventBuilder = me.sandbox.getEventBuilder("statehandler.HistoryContent");
				}
				if (!me._historyContentEvent) {
					me._historyContentEvent = me._historyContentEventBuilder(state, me._historyPrevious);
				}
				sandbox.notifyAll(me._historyContentEvent, true);

				break;
		}
	},

	historyMoveNext : function() {
		var me = this, sandbox = me.getSandbox();
		if (me._historyNext.length > 0) {
			var state = me._historyNext.pop();
			me._historyPrevious.push(state);

			var mapmodule = sandbox.findRegisteredModuleInstance('MainMapModule');
			me._historyEnabled = false;

			var currentState = me._getMapState();
			me._setMapState(mapmodule, state, currentState);
			me._historyEnabled = true;

			if (!me._historyContentEventBuilder) {
				me._historyContentEventBuilder = me.sandbox.getEventBuilder("statehandler.HistoryContent");
			}
			if (!me._historyContentEvent) {
				me._historyContentEvent = me._historyContentEventBuilder(state, me._historyPrevious);
			}
			sandbox.notifyAll(me._historyContentEvent, true);
		}
	}
});
