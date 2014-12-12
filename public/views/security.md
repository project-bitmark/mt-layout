
## Markthis Security API

MarkThis has a custom user authentication, encryption, and state system.

### Registration

Registration consists of two steps:

 and send hashes of `password` and `2fa`
 
**Registration: Step 1**

First create a new user, and assciate the first default alias (`@username`), and a rescue address (`email`).

* Harvest a `@username` and `email`
* Send `@username` and `email` address to server to get a `client-identifier` (sha256 random hash)

**Registration: Step 2**

Send hashes of the users `password` and `2fa` to the server so it can authenticate packets.

* Harvest `password` and `2fa` tokens from the user
* Send a sha256 hash of `password` and `2fa` along with `client-identifier` to server.

This is the only time these details are passed to the server, from this point on all data is signed and authentication details are never sent again.


### Authentication

Authentication is stateless, each POST of data to the server contains cryptographic tokens which allow the server to identify the user, and verify the message hasn't been tampered with or subject to a MITM transformation.


### Hashing
       
The Security model includes a custom hashing algorithm `hash( arg1, arg2, ... )`.

Initialise `hash` with an empty string `s`.

For all arguments passed to `hash( arg1, arg2, ... )`:

* concatenate `arg*` to `s`
* turn `arg*` in to UTF8 words, take the last byte `lb` of the last word
* concatenate `SALTS[lb]` to `s`

The final hash is SHA256 hash of string `s`. 

            
### Authenticated Messages

The basic JSON structure of all messages takes the following format:

```
{
  id: `id`,
  client: `client-identifier`,
  random: `16 random words`,
  time: `time in milliseconds since unix epoch`
  signature: `signature`,
  foo: 1, bar: 2, ...
};
```

* Let `a` be the product of calling `hash(client-identifier, password)`
* Let `p1` be the product of calling `hash(a, random)`
* Let `b` be the product of calling `hash(2fa)`
* Let `twofa` be the product of calling `hash(b, random)`
* Let the message identifier `id` be the product of calling `hash(p1, time, twofa)`

Finally, each message contains a signature which hashes all the data in the message in a recomposable manner.

* Let `signature` be the product of calling `hash(p1, id, client, random, time, foo, bar, ...)`

This data allows us to:

* Authenticate a user in a stateless without passing any authentication tokens, by only a message `id`
* Protect users by varying `p1` and `twofa` with both random data and time built in to the hashing process
* Mitigate against replay attacks, as `id` is unique to each message
* Mitigate against MITM attacks, as if any data is tampered with the `signature` is invalidated.
* Prove data is untampered with by servers, as only the client knows the raw `password` and `2fa` values.
* Allow public messages to be sent over unencrypted channels without MITM, Replay, Forgery etc.


## Examples

The following two messages are constructed within one second of each other from the same authentication details.

```
{
  "client":"314f444d6cd829c5031a28eea3fd0c279866392bc42a09efe81617ad3d796b32",
  "random":"567ba45706a47b78184180ec397be672",
  "time":1418345037243,
  "id":"56f7a9fe3b8674ab5e8598609ba89e73a9837a8d0ed2ff83d4341eaa343db06c",
  "signature":"97cde0c01aa9fb2ff2716f4e7e74c302ea5d7ef54398fa139c735afc7f996bcd"
}
 
```

```
{
  "client":"314f444d6cd829c5031a28eea3fd0c279866392bc42a09efe81617ad3d796b32",
  "random":"eb5eed7b50a419714bc4855027c0bc2a",
  "time":1418345038351,
  "id":"62c99f183b6290068a7b157154cbdc26320c6871e42f124359f82c3ad9328841",
  "signature":"55129fa7be028fad0d82397aabec3580ff230094f9d4e7a80ef27a8b11bd0fa6"
}
```


 