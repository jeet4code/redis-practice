#Redis example to cache data

### Local changes for local env.

1. ##### set enviournment path to redis folder

2. ##### Run local server
    ```bash
    redis-server "c:\Program Files\Redis\redis.windows.conf"
    ```

#### PM2 Commands
```
pm2 start index.js -i 0
pm2 list
pm2 show name
pm2 monit
pm2 delete name
```

#### autocannnon 
###### options c=currcurrent, d= duration in sec, p= pipeline,
```bash
npx autocannon -c 100 -d 5 -p 10 http://localhost:3000
```