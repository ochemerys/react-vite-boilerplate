# How to find and terminate a Windows Processes by Port

## Find the Process ID (PID)

``` bash
C:\Users\user> netstat -a -o -n

Active Connections

Proto  Local Address          Foreign Address        State           PID
...
TCP    [::]:8080              [::]:0                 LISTENING       3664
...

```

## Confirm that PID is for node.exe (optional)

``` bash
C:\Users\user> tasklist

Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
...
node.exe                      6736 Services                   0      2,080 K
cmd.exe                       3048 Services                   0      2,268 K
node.exe                      3664 Services                   0      6,768 K
...

```

## Stop the running process

``` bash
C:\Users\user> taskkill /f /pid 3664
SUCCESS: The process with PID 3664 has been terminated.
```