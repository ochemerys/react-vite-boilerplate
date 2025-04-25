# Add CSP Headers in IIS 

React Production Build

## Option 1: Web.config File

IIS uses a web.config file for configuration. If your React app is a
static build (vite build output), just place a web.config file in the
root of your dist/ folder like this:

dist/web.config (example CSP setup)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name="Content-Security-Policy" value="default-src 'self';
script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'
data:; font-src 'self'; connect-src 'self';" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

Adjust the policy as needed depending on your use of 3rd-party
fonts, APIs, CDNs, etc.

#### How to use it:

After running vite build, copy this web.config file into your dist/ folder.

Deploy the dist/ folder contents to your IIS site root.

## Option 2: Set CSP via IIS GUI

* Open IIS Manager.
* Select your site.
* Go to HTTP Response Headers.
* Click Add…
  - Name: Content-Security-Policy
  - Value: (Your CSP policy string)

* Apply changes and restart the site.

Don't Forget: Inline Scripts

Vite injects an inline type="module" script in index.html. So if you’re
enforcing a strict CSP (no 'unsafe-inline'), you’ll need to:

* Use a nonce or hash for inline scripts (advanced)
* Or temporarily allow 'unsafe-inline' (less secure)

✨ Example CSP Policy for Vite + React + Tailwind

``` http
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data:;
```