import React, { useEffect, useRef } from 'react';
import './JitsiVideoCall.css'; 

const JitsiVideoCall = ({ roomName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: roomName,
        width: '100%',
        height: '100%', 
        parentNode: jitsiContainerRef.current,
        configOverwrite: {},
        interfaceConfigOverwrite: {},
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => api.dispose(); 
    } else {
      console.error('Jitsi Meet API non disponible');
    }
  }, [roomName]);

  return (
    <div className="jitsi-wrapper">
      {/* Ajout d'un logo */}
      <div className="video-logo">
        <img src="src/assets/logo.png" alt="" />
      </div>
      
      {/* Conteneur pour la vidéo */}
      <div id="jitsi-container" ref={jitsiContainerRef} className="jitsi-video-container"></div>
    </div>
  );
};

export default JitsiVideoCall;
