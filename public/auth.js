const AUTH = {

    SESSION_DURATION_MS: 30 * 60 * 1000,   // 30 minutes
    ALLOWED_CREDENTIALS: {
      "commander": "trishul@2026",
      "operator":  "op_secure_99"
    },
  
    
  
    getDeviceId() {
      let id = localStorage.getItem("trishul_device_id");
      if (!id) {
        id = "DEV-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10).toUpperCase();
        localStorage.setItem("trishul_device_id", id);
      }
      return id;
    },
  
    
  
    registerDevice() {
      const id = this.getDeviceId();
      localStorage.setItem("trishul_registered_device", id);
    },
  
    
  
    isDeviceAuthorized() {
      const current    = this.getDeviceId();
      const registered = localStorage.getItem("trishul_registered_device");
      return current === registered;
    },
  
    
  
    createSession(username) {
      const token = "SESS-" + username + "-" + Date.now();
      const expiry = Date.now() + this.SESSION_DURATION_MS;
  
      sessionStorage.setItem("trishul_token", token);
      sessionStorage.setItem("trishul_user", username);
      sessionStorage.setItem("trishul_expiry", expiry.toString());
      sessionStorage.setItem("trishul_device", this.getDeviceId());
    },
  
  
    isSessionValid() {
      const token    = sessionStorage.getItem("trishul_token");
      const expiry   = sessionStorage.getItem("trishul_expiry");
      const device   = sessionStorage.getItem("trishul_device");
      const current  = this.getDeviceId();
  
      if (!token || !expiry || !device) return false;
      if (Date.now() > parseInt(expiry)) return false;
      if (device !== current) return false;
  
      return true;
    },
  
  
    logout() {
      sessionStorage.clear();
      window.location.href = "index.html";
    }
  
  };