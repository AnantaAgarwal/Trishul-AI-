const TRISHUL_STATE = {
    air: {
      threatLevel: 75,
      objectsTracked: 7,
      escalation: 20
    },
    cyber: {
      threatLevel: 65,
      intrusions: 2,
      integrity: 94
    },
    ew: {
      threatLevel: 55,
      spectrumStatus: "JAMMED",
      signalIntegrity: 60
    },
    nationalRisk: 68,
    recommendedAction: "ISOLATE NODE"
  };
  
  
  
  function saveState(){
    localStorage.setItem("TRISHUL_STATE", JSON.stringify(TRISHUL_STATE));
  }
  
  
  function loadState(){
    const stored = localStorage.getItem("TRISHUL_STATE");
    if(stored){
      Object.assign(TRISHUL_STATE, JSON.parse(stored));
    }
  }
  
  
  function escalateDomain(domain, amount){
    TRISHUL_STATE[domain].threatLevel += amount;
    TRISHUL_STATE.nationalRisk += amount * 0.4;
  
    if(TRISHUL_STATE[domain].threatLevel > 100)
      TRISHUL_STATE[domain].threatLevel = 100;
  
    if(TRISHUL_STATE.nationalRisk > 100)
      TRISHUL_STATE.nationalRisk = 100;
  
    saveState();
  }
  
  
  function recalculateRisk(){
    TRISHUL_STATE.nationalRisk = Math.round(
      (TRISHUL_STATE.air.threatLevel * 0.4) +
      (TRISHUL_STATE.cyber.threatLevel * 0.35) +
      (TRISHUL_STATE.ew.threatLevel * 0.25)
    );
  
    saveState();
  }