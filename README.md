Per avviarli, digitare "npm start" nella bash.

server-web:

L'applicazione in Unity si connetterà all'url "ws://192.168.40.100:8080"
tramite il quale manderà un messaggio "l:6" (l sta ad indicare limit),
ovvero sta chiedendo al server-web di avere gli ultimi n file caricati nella cartella files
(controlla la data di ultima modifica).
Quando riceverà invece il messaggio "i:3" (i sta per index), sta chiedendo al web-server 
di inviargli il modello corrispondente all'indice speditogli.

Problema
Nella parte di codice commentata invia anche i file dicom corrispondenti,
ma dato che sono tanti e anche molto lunghi, blocca l'applicazione in Unity
quindi allo stato attuale viene caricato solo l'.obj a runtime.



upload-files:

Scrivere nel url di un motore di ricerca "http://127.0.0.1/8000"
per visualizzare la pagina upload_files.html la quale permette 
il caricamento di un solo modello con estensione .obj e una moltitudine di file dicom
che vengono salvati in una cartella files. I file dicom vengono salvati in una 
nuova cartella che ha lo stesso nome del modello.

Se i file sono stati caricati correttamente la pagina viene reindirizzata ad un altro url
in cui si vede la scritta "Upload file success".

Nell'html ho commentato una parte di codice che potrebbe essere usata per comunicare con il web-server
direttamente per notificare a runtime il caricamento di nuovi file.