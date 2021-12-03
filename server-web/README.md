Per avviarlo, digitare "npm start" nella bash.

L'applicazione in Unity si connetterà all'url "ws://192.168.40.100:8080"
tramite il quale manderà un messaggio "l:6" (l sta ad indicare limit),
ovvero sta chiedendo al server-web di avere gli ultimi n file caricati nella cartella files.
Quando riceverà invece il messaggio "i:3" (i sta per index), sta chiedendo al web-server 
di inviargli il modello corrispondente all'indice speditogli.

Nella parte di codice commentata invia anche i file dicom corrispondenti,
ma dato che sono tanti e anche molto lunghi, blocca l'applicazione in Unity
quindi allo stato attuale viene caricato solo l'.obj a runtime.