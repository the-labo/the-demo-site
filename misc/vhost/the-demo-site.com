### HTTPs Virtual host settings for 


server {
  listen 80;
  listen [::]:80;
  server_name the-demo-site.com;

  location / {
    return 301 https://$server_name$request_uri;
  }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name the-demo-site.com;

  ssl_certificate /etc/letsencrypt/live/the-demo-site.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/the-demo-site.com/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_trusted_certificate /etc/letsencrypt/live/the-demo-site.com/fullchain.pem;

  location / {
    proxy_pass http://127.0.0.1:6004;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}