#### Prerequisites:
- PHP version must be on 5.4 or above.
- Install Composer for PHP Library support
- `npm install bower -g` - installs bower package manager
-  Cloning - cmd into an empty directory for development:
`git clone https://github.com/jbagaresgaray/popping-torch.git` this repository is public so no need to have a account

-   After cloning, cd into project:
`composer install` - installs dev dependencies (js libraries listed in package.json)
`bower install` - installs javascript libraries (js libraries listed in bower.json)

-   Run Application in development:
`php -S localhost:8000`