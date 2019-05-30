export class Sr {
    base = '';
    routes = [];
    path = '';
    links = [];
    outlet = document.querySelector('[sr-outlet]');

    constructor(base, routes) {
        this.base = base;
        this.routes = routes;

        this.link();
        this.catch();
    }

    catch() {
        this.path = location.pathname;
        console.log(this.path);
    }

    link() {
        this.links = [...document.querySelectorAll('[sr-link]')];
        this.links.forEach(link => {
            link.addEventListener('click', this.navigate.bind(this));
            link.setAttribute('href', link.attributes['sr-link'].value);
        });
    }

    navigate(event) {
        event.preventDefault();
        const route = event.target.attributes['sr-link'].value;
        this.outlet.innerHTML = this.routes[route];
        history.pushState({
            path: route
        }, null, route);
    }
}
