# Fabric Remote JS

This is a javascript interface to Fabric Remote.  It allows you to remotely call
Fabric commands over the HTTP REST API provided by Fabric Remote.

# Installation

```
bower install fabric-remote-js
```

# Usage

Fabric Remote Js provides the `FabricRemote` object.  This needs to be configured to point to the correct Fabric Remote server, and given the authorization credentials:

```javascript
var fr = new FabricRemote("localhost", 1234, "opensesame");
```

Now you can get a list of available commands:

```javascript
fr.list_commands();
```

This returns a javascript object like this:

```javascript
{
  host_type: {
  name: "host_type",
  description: "returns the host type"
},
  check_foo: {
  name: "check_foo",
  description: null
  }
}
```

You can also call commands like this:

```javascript
fr.host_type()
  .then(return_value) {
    console.log(return_value);
}
```

There is a longer syntax for calling commands.  This allows you to pass args and kwargs, and you can also pass a list of tasks.

```javascript
fr.call([
  {task: "host_type", args: ["foo", "bar"], kwargs: {"arg1":"val1"}}
])
```

Both of these return a promise (using the Q library).  You can also get progress notifications (streaming output of the command).  See the [Q docs](https://github.com/kriskowal/q#progress-notification) for more.
