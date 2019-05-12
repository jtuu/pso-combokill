const v = (() => {
    class VirtualNodeClassList extends Array {
        clear() {
            this.length = 0;
        }
        get value() {
            return this.join(" ");
        }
        set value(val) {
            this.clear();
            this.add(...val.split(" "));
        }
        addOne(className) {
            const idx = this.indexOf(className);
            if (idx > -1) {
                return false;
            }
            this.push(className);
            return true;
        }
        add(...classNames) {
            const numToFind = classNames.length;
            if (numToFind === 1) {
                this.addOne(classNames[0]);
            }
            else {
                let dupesFound = 0;
                for (const cls of classNames) {
                    let isDupe = false;
                    for (let i = 0; i < this.length; i++) {
                        if (this[i] === cls) {
                            isDupe = true;
                            // all are duplicates?
                            if (++dupesFound >= numToFind) {
                                return;
                            }
                            break;
                        }
                    }
                    if (!isDupe) {
                        this.push(cls);
                    }
                }
            }
        }
        removeOne(className) {
            const idx = this.indexOf(className);
            if (idx > -1) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        }
        remove(...classNames) {
            const numToFind = classNames.length;
            if (numToFind === 1) {
                this.removeOne(classNames[0]);
            }
            else {
                for (let i = this.length; i--;) {
                    for (let j = classNames.length; j--;) {
                        if (this[i] === classNames[j]) {
                            this.splice(i, 1);
                            classNames.splice(i, 1);
                        }
                    }
                }
            }
        }
        item(idx) {
            if (idx < 0 || idx > this.length) {
                return null;
            }
            return this[idx];
        }
        toggle(className, force) {
            if (typeof force === "undefined") {
                if (this.removeOne(className)) {
                    return false;
                }
                else {
                    this.push(className);
                    return true;
                }
            }
            else {
                if (force) {
                    this.addOne(className);
                }
                else {
                    this.removeOne(className);
                }
                return force;
            }
        }
        contains(className) {
            return this.includes(className);
        }
        replace(oldClassName, newClassName) {
            const idx = this.indexOf(oldClassName);
            if (idx > -1) {
                this.splice(idx, 1, newClassName);
            }
        }
        forEach(callbackfn, thisArg) {
            super.forEach(callbackfn, thisArg);
        }
        // wtf is this
        supports(_token) {
            return false;
        }
    }
    class VirtualNodeImpl {
        constructor(tagName, attrsOrChildren, children) {
            this.text = null;
            this.tagName = tagName;
            this.eventHandlers = [];
            this.domElement = null;
            const baseAttrs = VirtualNodeImpl.getBaseAttrs();
            if (typeof attrsOrChildren === "string") {
                if (Array.isArray(children)) {
                    throw new TypeError("Can't mix vnodes and text.");
                }
                this.attrs = baseAttrs;
                this.text = attrsOrChildren;
                this.children = [];
            }
            else if (Array.isArray(attrsOrChildren)) {
                this.attrs = baseAttrs;
                this.children = attrsOrChildren;
            }
            else if (typeof attrsOrChildren === "object") {
                this.attrs = Object.assign(baseAttrs, attrsOrChildren);
                if (typeof this.attrs.class === "string") {
                    this.attrs.classList.add(...this.attrs.class.split(" "));
                }
                if (typeof children === "string") {
                    this.text = children;
                    this.children = [];
                }
                else if (Array.isArray(children)) {
                    this.children = children;
                }
                else {
                    this.children = [];
                }
            }
            else {
                if (children !== undefined) {
                    throw new TypeError("Wrong argument order.");
                }
                this.attrs = baseAttrs;
                this.children = [];
            }
        }
        static setElementStyle(el, style) {
            for (const key in style) {
                if (style.hasOwnProperty(key)) {
                    el.style[key] = style[key];
                }
            }
        }
        static getBaseAttrs() {
            return {
                classList: new VirtualNodeClassList()
            };
        }
        setAttrs(el) {
            if (this.text !== null) {
                el.textContent = this.text;
            }
            for (const [k, v] of Object.entries(this.attrs)) {
                el[k] = v;
            }
            el.className = this.attrs.classList.value;
            if (this.attrs.style !== undefined) {
                VirtualNodeImpl.setElementStyle(el, this.attrs.style);
            }
            for (const [event, handler] of this.eventHandlers) {
                el.addEventListener(event, handler);
            }
        }
        static getParent(node) {
            const parent = node.parentElement;
            if (parent === null) {
                throw new Error("Cannot get parent of Node which does not exist in DOM.");
            }
            return parent;
        }
        toDOM() {
            if (this.domElement === null) {
                const self = document.createElement(this.tagName);
                this.setAttrs(self);
                const frag = document.createDocumentFragment();
                for (const child of this.children) {
                    frag.appendChild(child.toDOM());
                }
                self.appendChild(frag);
                this.domElement = self;
            }
            return this.domElement;
        }
        appendTo(parent) {
            const self = this.toDOM();
            parent.appendChild(self);
            return self;
        }
        prependTo(parent) {
            const self = this.toDOM();
            parent.insertBefore(self, parent.firstChild);
            return self;
        }
        insertAfter(sibling) {
            const self = this.toDOM();
            const parent = VirtualNodeImpl.getParent(sibling);
            parent.insertBefore(self, sibling.nextSibling);
            return self;
        }
        insertBefore(sibling) {
            const self = this.toDOM();
            const parent = VirtualNodeImpl.getParent(sibling);
            parent.insertBefore(self, sibling.nextSibling);
            return self;
        }
        addEventListener(event, handler) {
            if (this.domElement === null) {
                this.eventHandlers.push([event, handler]);
            } else {
                this.domElement.addEventListener(event, handler);
            }
        }
    }
    return function v(tagName, attrsOrChildren, children) {
        return new VirtualNodeImpl(tagName, attrsOrChildren, children);
    }
})();
