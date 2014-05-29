----
# 5) simple extension with flyout and some event handling and lodash templates
- adds own event class
- Note: listens to own event just for demo purposes - no need to send events to self in real life scenarios  


```


require({
� 'packages': [{
� � 'name': 'lodash',
� � 'location': '/Oskari/libraries/lodash/2.3.0/',
� � 'main': 'lodash'
� }]
},["oskari","lodash","divmanazer"], function(Oskari,_) {

    /* This creates and registers an event class */
    var Event = Oskari.Event.extend({ 
        name: 'MyEvent', 
        getMsg: function() { return this.msg; }
    }); 
    

    /* 1) Declarations */
    var Flyout = Oskari.ui.Flyout.extend({
        startPlugin : function () {
            var me = this, el = this.getEl(), msg = this.templates.hello();
            el.append(msg);

            var elBtn = jQuery('<button>Go to Tampere!</button>');
            elBtn.click(function() {
                me.issue('MapMoveRequest',326165,6822369,10);

            });
            el.append(elBtn);

            el.append(jQuery('<div />'));

            var elEventBtn = jQuery('<button>Send Event to Anyone (including Self)</button>');
            elEventBtn .click(function() {
                me.notify('MyEvent',{ msg: 'Hello everybody' } );

            });
            el.append(elEventBtn );

        },
        templates: {
            'hello': _.template('This is an Oskari2 extension Flyout with templates'),
            'mapmoved' : _.template('<div>map moved ${ lon },${ lat }.</div>') 
        },
        showMapMoved: function (lonLat) {
            this.getEl().append(
                 this.templates.mapmoved(lonLat) 
            );
        }
    });

    /* Note: only extension is events enabled by default */

    var Extension  = Oskari.ui.Extension.extend({
        startPlugin : function () {
            this.setDefaultTile('O2 Notifier');
            this.setFlyout(Flyout.create(this, { title: 'Oskari2 Extension with Events and Templates'}));
        }
    })    
    .events({
       'AfterMapMoveEvent' : function(evt) {
          this.getFlyout().showMapMoved({ lon: evt.getCenterX(), lat: evt.getCenterY()} );
        },
        'MyEvent' : function(evt) {
          this.getFlyout().getEl().append(evt.getMsg()+" from Self");
        }
    });

    /* 2) Getting things Started */
    var Module = Oskari.Module.extend({
        extension: Extension, 
        identifier: 'simpleextension5', 
        locale : {}
    });

    Module.start()

});


```

# 6) simple extension with flyout and some event handling and lodash templates plus request handler
- adds own request class and a request handler which other (or self) modules may call
- Note: listens to own event just for demo purposes - no need to send events to self in real life scenarios
- Note: send request to self just for demo purposes - no need to send requests to self in real life scenarios
- Note: requires a patch not available in demo at the time of writing - see bottom for patch #1
  

```


require({
� 'packages': [{
� � 'name': 'lodash',
� � 'location': '/Oskari/libraries/lodash/2.3.0/',
� � 'main': 'lodash'
� }]
},["oskari","lodash","divmanazer"], function(Oskari,_) {

    /* This creates and registers an event class */
    var Event = Oskari.Event.extend({ 
        name: 'MyEvent', 
        getMsg: function() { return this.msg; }
    }); 
    
    /* This creates and registers a request class */
    var Request = Oskari.Request.extend({ 
        name: 'MyRequest', 
        getMsg: function() { return this.msg; }
    }); 
    

    /* 1) Declarations */
    var Flyout = Oskari.ui.Flyout.extend({
        startPlugin : function () {
            var me = this, el = this.getEl(), msg = this.templates.hello();
            el.append(msg);

            var elBtn = jQuery('<button>Go to Tampere!</button>');
            elBtn.click(function() {
                me.issue('MapMoveRequest',326165,6822369,10);

            });
            el.append(elBtn);

            el.append(jQuery('<div />'));

            var elEventBtn = jQuery('<button>Send Event to Anyone (including Self)</button>');
            elEventBtn .click(function() {
                me.notify('MyEvent',{ msg: 'Hello everybody' } );

            });
            el.append(elEventBtn );
         
            var elRequestBtn = jQuery('<button>Send Request (processed by Self)</button>');
            elRequestBtn.click(function() {
                me.issue('MyRequest',{ msg: 'Hello Me - please Proceed' } );

            });
            el.append(elRequestBtn );

        },
        templates: {
            'hello': _.template('This is an Oskari2 extension Flyout with templates'),
            'mapmoved' : _.template('<div>map moved ${ lon },${ lat }.</div>') 
        },
        showMapMoved: function (lonLat) {
            this.getEl().append(
                 this.templates.mapmoved(lonLat) 
            );
        }
    });

    /* Note: only extension is events and request hanling enabled by default */
    /* This extension receives some events  */
    /* This extension processes one registered request */
    var Extension  = Oskari.ui.Extension.extend({
        startPlugin : function () {
            this.setDefaultTile('O2 Requester');
            this.setFlyout(Flyout.create(this, { title: 'Oskari2 Extension with Events and Templates'}));
        }
    })    
    .events({
       'AfterMapMoveEvent' : function(evt) {
          this.getFlyout().showMapMoved({ lon: evt.getCenterX(), lat: evt.getCenterY()} );
        },
        'MyEvent' : function(evt) {
          this.getFlyout().getEl().append(evt.getMsg()+": received an EVENT from Self. ");
        }
    })
    .requests({
       'MyRequest' : function(req) {
          this.getFlyout().getEl().append(req.getMsg()+": got A REQUEST from Self. ");
       }
    });

    /* 2) Getting things Started */
    var Module = Oskari.Module.extend({
        extension: Extension, 
        identifier: 'simpleextension6', 
        locale : {}
    });

    Module.start()

});


```
  
