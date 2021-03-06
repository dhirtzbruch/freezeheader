<article class="markdown-body entry-content" itemprop="mainContentOfPage"><h1>
<a name="jqueryfreezeheader-" class="anchor" href="#jquerycookie-"><span class="mini-icon mini-icon-link"></span></a>
jquery.freezeheader 
</h1>

<p> A simple jquery plugin to freeze header row in html table.</p>

<h2>
<a name="installation" class="anchor" href="#installation"><span class="mini-icon mini-icon-link"></span></a>Installation</h2>

<h3>Manual installation</h3>
<p>Include script <em>after</em> the jQuery library (unless you are packaging scripts somehow else):</p>
<pre><code>&lt;script src="/path/to/jquery.freezeheader.js"&gt;&lt;/script&gt;
</code></pre>

<h3>Using bower package manager</h3>
<p>The Plugin is already prepared for installation using bower package manager.</p>
<p>The installation is as simple as:</p>
<h4>Add the Repository definition to your bower dependencies</h4>

```javascript
    {
        "dependencies" : {
            "freezeheader" : "https://github.com/dhirtzbruch/freezeheader/archive/master.zip"
        }
    }
```

<h4>Install Plugin</h4>
<pre><code>bower install freezeheader</code></pre>

<h2>
<a name="usage" class="anchor" href="#usage"><span class="mini-icon mini-icon-link"></span></a>Usage</h2>

<p>Create a table with fixed header in the top browser:</p>

```javascript
        $(document).ready(function () {
            $("#tableid").freezeHeader();
        })
```

<p>Create a table with fixed header and scroll bar:</p>

```javascript
        $(document).ready(function () {
            $("#tableid").freezeHeader({ height: 300 });
        })
```

<h2>
<a name="demo" class="anchor" href="#demo"><span class="mini-icon mini-icon-link"></span></a>Demo</h2>
<p><strong><a href="http://laertejjunior.github.io/freezeheader/">http://laertejjunior.github.io/freezeheader/</a></strong> </p>
<h2>
<a name="development" class="anchor" href="#development"><span class="mini-icon mini-icon-link"></span></a>Development</h2>

<ul>
    <li>Source hosted at <a href="https://github.com/dhirtzbruch">GitHub</a></li>
    <li>Report issues, questions, feature requests on <a href="https://github.com/dhirtzbruch/freezeheader/issues">GitHub Issues</a></li>
    <li>Original Source by <b>Laerte Mercier Junior</> hosted at <a href="https://github.com/laertejjunior">GitHub</a></li>
</ul>

<p>Pull requests are very welcome! Make sure your patches are well tested. Please create a topic branch for every separate change you make.</p>

<h2>
<a name="authors" class="anchor" href="#authors"><span class="mini-icon mini-icon-link"></span></a>Authors</h2>
<ul>
    <li><a href="https://github.com/laertejjunior">Laerte Mercier Junior</a></li>
    <li><a href="https://github.com/dhirtzbruch">Daniel Hirtzbruch</a></li>
</ul>
</article>
