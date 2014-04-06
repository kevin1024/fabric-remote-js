# Fabric Remote JS Client

This is a javascript interface to Fabric Remote.  It allows you to remotely call
Fabric commands over the HTTP REST API provided by Fabric Remote.  It works both
as a node module (server-site) and in the browser, thanks to browserify.

# What is Fabric Remote?

It's a project I'm working on that I haven't open sourced yet.  But this is the JS interface for it!

# Installation

For the browser:
```
bower install fabric-remote
```

For node:
```
npm install fabric-remote
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

This returns a promise that will return a result like this:

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

# Promise interface

You can call .progress() on the promise to get regular updates of the streaming output of the task execution.  .success() will get called with the output of your execution.

# TODO

Error handling sucks.
