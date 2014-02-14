Certain transactions return data, or "[`results`](http://www.w3.org/TR/IndexedDB/#dfn-request-result)", from the database. These transactions are called "[`requests`](http://www.w3.org/TR/IndexedDB/#dfn-request)" and with the exception of database opening, the values are always various combinations of object "keys" and "values" and instances of [`IDBRequest`](https://developer.mozilla.org/en-US/docs/Web/API/IDBRequest). [`Request transactions`](http://www.w3.org/TR/IndexedDB/#dfn-request-transaction) are just that: a transaction request," namely the act of asking for something rather than the getting of it. A programmer encounters them when dealing with `IDBObjectStore`, `IDBIndex` or `IDBCursor` objects. They have a `done` attribute and, alternatively displaying the same information, a `readyState` that says whether they are "`pending`" or "`done`". Unlike many databases, requests are not fulfilled immediately after being [`placed`](http://www.w3.org/TR/IndexedDB/#dfn-place-request), or "synconronously"; however, these non-immediate responses are rather "asyncronous", and the mechanism a programmer uses to await an asynconrous reponse is by coding a "callback" function IDB can invoke on various "events" such as a successful response.

There are various types of callbacks in IDB depending on the type of transaction. Requests generally have "onsuccess", "onerror and "onabort" callbacks. Others include "onupgradeneeded", "onclose" and "onblocked," sometimes seen when working with databases. Each event has a different meaning depending on the transaction, but for example "onsuccess", "onupgraded" are generally a good event for the programmer while "onerror", "onabort" and "onblocked" mean something went awry for him.