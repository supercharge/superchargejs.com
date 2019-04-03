# Supercharge Website
This repository contains the source of the [superchargejs.com](https://superchargejs.com) website.


## Setup
First, clone this repository to your machine.

```
git clone https://github.com/superchargejs/superchargejs.com.git
```

Next, change your terminal into the cloned directory. Then install the project’s dependencies:

```
npm install
```

Then go ahead and set up the project using the help of the Craft CLI:

```
node craft setup
```

That’s it! You can now start the Supercharge server:

```
node server.js
```

Enjoy!


## Documentation
One of the main purposes of the Supercharge website is serving the documentation.

The Supercharge documentation lives in the [superchargejs/docs]() repository. The website renders the markdown files as HTML pages.

To serve docs in your local installation, create the `resources/docs` directory and navigate into it:

```
mkdir resources/docs
cd resources/docs
```

From here, clone the [superchargejs/docs]() repository into the `master` folder:

```
git clone git@github.com:superchargejs/docs.git master
```

The directory has to be named `master` because the default documentation version is called `master`. The `config/docs.js`  configuration file contains the version mappings. The keys represent the expected folder names within `resources/docs`.


---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@superchargejs](https://github.com/superchargejs/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
