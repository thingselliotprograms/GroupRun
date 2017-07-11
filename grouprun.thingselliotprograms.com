server {
      listen 80;
      server_name 50.116.14.192 grouprun.thingselliotprograms.com www.grouprun.thingselliotprograms.com;

      location / {
          rewrite ^ https://$server_name$request_uri permanent;
      }
}

server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/grouprun.thingselliotprograms.com/cert.pem;
    ssl_certificate_key /etc/letsencrypt/live/grouprun.thingselliotprograms.com/privkey.pem;
    server_name 50.116.14.192 grouprun.thingselliotprograms.com www.grouprun.thingselliotprograms.com;

    root /var/www/grouprun.thingselliotprograms.com;
    index /client/index.html index.htm;

    location /api {
        proxy_pass https://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /socket.io {
        proxy_pass https://localhost:3000;
    }
    location / {
        try_files $uri $uri.html $uri/ /client/index.html;
    }
}
