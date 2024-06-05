"use client"// hooks/usePeer.ts
import Peer, { SignalData } from 'simple-peer';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

const usePeer = (initiator: boolean, socket: Socket | null) => {
  const [peer, setPeer] = useState<Peer.Instance | null>(null);

  useEffect(() => {
    if (!socket) return;

    const p = new Peer({ initiator, trickle: false });

    p.on('signal', (data: SignalData) => {
      socket.emit('signal', data);
    });

    p.on('connect', () => {
      console.log('Peer connected');
    });

    p.on('data', (data) => {
      // Handle incoming data
      console.log('Data received:', data);
    });

    setPeer(p);

    return () => {
      p.destroy();
    };
  }, [initiator, socket]);

  return peer;
};

export default usePeer;
