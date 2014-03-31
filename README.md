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
var fr = new FabricRemote("http://localhost", 1234, "opensesame");
```

Now you can get a list of available tasks:

```javascript
fr.listTasks();
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

Here is how you execute tasks.  This allows you to pass args and kwargs, and you can also pass a list of tasks.

```javascript
fr.execute([
  {task: "host_type", args: ["foo", "bar"], kwargs: {"arg1":"val1"}}
])
```

Both of these return a jquery promise.
