(function(M, $) {
  
  var session = window.sss = {
    key: null,
    user: null,
    storage: window.localStorage || (window.UserDataStorage && new UserDataStorage()) || 0,
  };
  
  M_state = M.state = {
    login: function(c, p, a) {
      session.key = M.keys.create(c, p);
      session.key.add2FA(a);
      this.tryKey();     
    },
    tryKey: function() {
      M.message.profile(session.key, function(d) {
        if(d.success == 0) {
          alert(d.error.message);
          return;
        }
        session.user = d.result;
        if(session.storage) session.storage.setItem('key', JSON.stringify(session.key));
      });
    },
    importFromSession: function() {
      if(!session.storage) return;
      if(!(session.key = session.storage.getItem('key'))) return;
      session.key = JSON.parse(session.key);
      this.tryKey();
    },
    logout: function() {
      session.storage.clear();
      session.key = null;
      session.user = null;
    },
  };
  
  M.state.importFromSession();
  
})(MT,  jQuery)