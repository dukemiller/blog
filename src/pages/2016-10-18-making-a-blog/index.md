---
path: "/making-a-blog"
date: "2016-10-18T04:19:42.085Z"
title: "Making A Blog"
tags: [experience, guide, ruby]
---

I got the inspiration to create a blog based on how helpful I would have found tutorials that go in depth on the experiences people had and how they navigated around and solved any problems, opposed to just step by step instructions. One such fun topic was creating this blog itself.

I had a few concerns for when I wanted to create this blog and the efforts I had to go through to make it successful, and really what I would attribute as success in this case is simply hosting the darn thing and having a stable environment, and to learn something about web development and the concerns faced in dealing with the architecture. I obviously wanted it to be an exercise in web development / have some interaction with servers and not just have a blog created for me as a complementary service, so the likes of blogspot or wordpress are not what I'm looking for.

So, from all of that, I had a list of goals of finding a service and platform to create a site:

- Some prebaked markdown support in some way, as I find using it way more simple than messing with pseudo-word recreations.
- Light cost considering the material (static pages), very preferably free to < $2 monthly
- Custom domain name support, non compromisable
- Frameworks OK

So, from here, I did a little research and collected my thoughts on the concerns I thought I would have. Eventually after going through it all, it felt like I hit the point of compromising learning so I can get to the point of fruition. Here's just a simple little representation of my map of ideas and my thoughts into making the site:

+ Programming language
	- Should I use a language I already know or one I don't for more exposure?
	- Should I use a more mature language or a newer language, not that it really matters
	- The template language of the server side language is another concern, but generally they're all easily digestible from my limited view of them
+ Front end 
	- Take a chance to learn javascript front-end languages more intimately?
	- Dump my minor knowledge on Angular 1.X to Angular 2.X? Learn React instead? Learn Vue.JS because people say it's really nice? Do I really even need to be that aggressive on front-end control or do I want to use making this blog as an excuse to apply some front-end development learning? 
	- What will the host provide? How will it mesh well with the server providers I have a selection from? From my limited experience, going a full SPA-style application requires a little more control on the control/routing logic which would require more knowledge and time if I choose a language I'm not familiar with
+ Hosting
	- Self hosted? Nginx, Apache? (ISP is blocking inbound port 80, so ...)
	- Is free hosting available? Would it be more impressive to employers/colleagues if I chose a service that is more hands on (say, just providing a linux box with nginx and configuring it all myself)?
	- Should I pick a provider that allows more than static hosting to gain knowledge and familiarity of the platform for any other projects I might do (Cloud providing services)?
+ Domain name
	- Availability of domain names?
	- What's a good domain name to use for a blog, Something clever with a matching clever TLD? Just my name?, Subdomain of my name? (winner)
	- General price of the domain name and any monetary concerns? Price of other TLDs? Price of that same domain on other domain providers? Recurring yearly price?
	- Which provider is the best and what concerns do I have with some hosts?
		+ security on the user and user registration of the domain? 
		+ scummy business practices? 
		+ ethics and practices they support e.g. SOPA? 
		+ fishy pricing e.g. $2 for one year then $32 yearly afterward?
	
So, with all of that, the search began.
	
---
	
## The Journey

So, my results in searching will be expressed below differentiated by the back-end language. I'll detail on experiences of what I thought I might have wanted to learn, with the hosting environment and put any bold on what technology, frameworks, and hosts I would have considered.

#### **Javascript**  

My website wouldn't need to be scaling or highly performant, and with javascript I could mess around on newer developed frameworks and have some sort of display and understanding for using them as well as closer exposure to the endless array of buzzwords I'm likely to see in the future. I would be using **Node** and for free simple hosting, I saw a few sites that gave simple continuous integrated deployments like **Heroku** which I had put a test project up on before. 

Full web development stacks like **MEAN** (Mongo, Express, Angular, Node) written all in javascript were common and it would spare me a little bit of learning on platforms. Not knowing anything at all about Mongo other than the internet and reddit really hates it, I would have wanted to use an ORM like **Mongoose** to connect it to **Postgres**, while also switching over to **React**. **SQLite** would have been a consideration too, but from my limited experience on webhosting they prefer you use their database service which usually already has Postgres on it. From there I guess it'd be the PERN stack? I just googled this now and there's a few results for it (of course) like [this boilerplate for starting on a "PERN" stack](https://github.com/danscratch/pern).  

#### **Python**

I had worked with **Flask** and perhaps wanted to give **Django** a try. I saw a lot of talk about doing **Digital Ocean** droplets or using similar services from javascript and saw a lot of overlap between the two. I saw hosting would be relatively cheap and there were a lot of python focused webhosts, and cross-platform hosting wouldn't be a problem (mostly like javascript). If I had been able to self-host, I think I would have stuck the server on my Raspberry Pi (and leave myself open to every vulnerability in the world) and attempted to do Flask, **Gunicorn** + **Nginx**, and I guess maybe also attempted to do Postgres+React here as well. 

#### **C#** 

I really like using this language generally, and thought branching into the web frameworks would be a good idea. **Azure** is a first-class citizen and deploying **ASP.NET MVC** seemed dead simple from what resources I gathered. As much as I love the language, I've had and continue to have lingering concerns over how I would be able to manage the software and where to deploy it to. What I mean is, the ASP.NET development history is a long and rich one that would require a lot more research to jump into initially, and the deployment targets can be a little limited. The compile target of a regular C# is (generally, from my use) a simple executable, but the workings of an ASP.NET project are a bit more complex. 

And so further continued my doubt. Whatever easiness in deployment I gained from messing around with creating Azure sites I lost in attempting to understand the service to any significant level without a lot more tinkering needed, and cloud site provision for a static blog is probably somewhere in the dictionary under the definition of overkill. I found that any free tier I could sign up for also did not provide free domain name changing (And I might have stuck with it if it weren't for that really). From this I began to look to alternatives but my next concern of limited hosting came into play. 

Most providers I found that are .NET capable generally don't follow my earlier preferences, but I would have been fine with that if they were more in line to what I would consider suitable. As this is from the "older" philosophy of C# development, the platform it could run on was almost exclusively Windows servers. I considered using **dotnet core** for being able to deploy to linux targets but the guides on this are sometimes schizophrenic differentiating from version to version and requiring more domain knowledge for initial hosting setup. 

My experience was that requirements change from one release to the next, future details of the language include plans of changing or removing parts of the framework and putting any of this together on a host seemed like I would have to weave through a few hacks and pray to god I don't need any advanced configuring. I put C# aside to continue my search as it seemed a little too much for what I thought would be a simple task.

As a side note, I could probably write an entire article about trying to learn Azure, finding the optimal startup for any free benefits on azure (Student Dreamspark (now Imagine?), Dev Essentials?, Applying as a business?, ...), but maybe another time.

## The Result

Ruby. Specifically, just leveraging the "Project Site" in "GitHub Pages" using Jekyll in their Ruby environment. It leverages markdown heavily, no hosting cost required, and supports custom domain names. Sometimes, the simplest choices are the hardest to find. I specify "Project Site" because there's another selection that is selective only to my user profile e.g. dukemiller.github.io, whereas pages would refer to any project repository e.g. dukemiller.github.io/blog. Installation is dead easy, which I truthfully only found out after a few hours of wondering why it's so hard to set up. 

But simply copying some stuff in a folder and pushing to github isn't that fun, right? I wanted to be able to develop locally and see changes before any push. To do that, I need to set up an environment in Ruby and boy, what a treat that was.

---

## The Ruby Experience 

Guides I used:

- [Github quick start pages guide.](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)  
- [Jekyll windows installation guide.](https://jekyllrb.com/docs/windows/#installation)
- [Getting the ruby devkit set up on windows.](https://labs.sverrirs.com/jekyll/1-ruby-and-devkit.html)
- [Jekyll quick start guide.](https://jekyllrb.com/docs/quickstart/)  

***Notice:*** _I don't have any Ruby, Jekyll gem or Liquid template knowledge whatsoever. Setting this up is my first time doing it. I am fully aware that some issues are brought upon by my misunderstanding and don't directly attribute them to using ruby itself._

### Setting up Ruby

Setting up Ruby isn't what I had in mind previously, but learning Ruby can still be valuable with it still having relevance online, so some exposure could be beneficial. I've always heard that installing Ruby and setting up a stable environment on Windows is told to be a fun experience for some, and have taken it as another challenge. 

Following the simple guide on Jekyll's site for installation, I get the interpreter and attempt to install the Jekyll gem and already I'm given a nice error:

````
ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://api.rubygems.org/specs.4.8.gz)
````

Oh man, now I'm already part of the gang. Using [this random wget that requires an admin console](http://stackoverflow.com/questions/4528101/ssl-connect-returned-1-errno-0-state-sslv3-read-server-certificate-b-certificat) didn't seem to help, and a bunch of concerns about this problem are primarily focused around helping Mac users for whatever reason. I did almost immediately find the fix [on the ruby gems site](http://guides.rubygems.org/ssl-certificate-update/), but you'd figure this sort of thing would have been fixed in the latest present build for the runtime. Continuing along the guide for creating just a simple empty Jekyll project environment, I'm sure nothing else will go wrong yeah? I create a Gemfile, put in what I'm assuming are the dependencies and do a ``bundle install`` and:

````
Using bundler 1.13.6
Gem::InstallError: The 'RedCloth' native gem requires installed build tools.
````

Great stuff. I know what the error is saying, but I don't quite understand the solution to fix it. I googled and found a creative solution to this problem too, ["The solution is to downgrade RubyGems because they haven't fixed it yet as of the latest version".](https://github.com/octopress/docs/issues/52#issuecomment-106468115) Well I mean why not at this point right? Another ``bundle install`` and:

````
C:/tools/ruby23/bin/bundle:22:in &lt;main&gt;: undefined method 'activate_bin_path' for Gem:Module (NoMethodError)
````

From here I google and I get a SO post [saying to update](http://stackoverflow.com/a/39775255). Doesn't this silly guy know I just downgraded? At this point I've probably borked my environment, so I'll just start from step 1. From this point on, I follow the Jekyll homepage windows installation guide because it seems to be related to the ruby devkit which is what the original problem was. Here you will find a bunch of commands that an install script should do for you that you will instead do yourself. Or perhaps, attempt to do:

````
Failures
 - ruby2.devkit (exited -2) - Error while running 'C:\ProgramData\chocolatey\lib\ruby2.devkit\tools\chocolateyInstall.ps1'.
  See log for details.
````

Though it seemed to install successfully with no failure to speak of. I had to google where to even find the logs for chocolatey, but I couldn't discern what the failure was. Maybe this is just to throw anyone off, put a few fake errors in there to keep you on your feet, but luckily for these guys I'm a persistent guy. Following three more libraries you install manually, you'll get some [useless looking output](http://i.imgur.com/MH6jYBa.png) but finally at some point in this workflow I bypassed the error I had previously. 

### Setting up the Jekyll gem

Alright, installation is done so back to the Jekyll get started guide, let's get this sucker going with a ``jekyll s`` and-

````
C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/bundler-1.13.6/lib/bundler/runtime.rb:40:in \`block in setup': You have already activated addressable 2.5.0, but your Gemfile requires addressable 2.4.0. Prepending `bundle exec` to your command may solve this. (Gem::LoadError)
````

Well dang, the error itself supported by [some more searching](http://stackoverflow.com/questions/6317980/you-have-already-activated-x-but-your-gemfile-requires-y) agrees on just plopping ``bundle exec`` in front of ``jekyll s``, so I do that to start the server and-

````
Invalid command. Use --help for more information
````

Oh ok. Doing a ``bundle exec jekyll`` shows the list of commands and -s is an option to a subcommand asking for a path, so there's probably a little more to add to the command. I'm guessing what the author meant is ``bundle exec jekyll serve -s`` which even then wouldn't work without including the current path with ``bundle exec jekyll serve -s .``. The least verbose way of writing this is just by doing ``bundle exec jekyll serve`` since I'm already in the correct directory. But, run it and presto, a beautiful 404 on localhost:4000. 

But you know, I'd like having some sort of template to go off of so following the github guide it suggests invoking jekyll itself via ``jekyll _3.3.0_ new your-new-empty-directory`` to create an empty templated project:

````
C:/tools/ruby23/lib/ruby/2.3.0/rubygems/dependency.rb:319:in 'to_specs': Could not find 'jekyll' (= 3.3.0) - did find: [jekyll-3.3.1,jekyll-2.4.0] (Gem::LoadError)
Checked in 'GEM_PATH=C:/Users/Duke/.gem/ruby/2.3.0;C:/tools/ruby23/lib/ruby/gems/2.3.0', execute `gem env` for more information
````

But compared to to anything we've seen so far, this is easily solvable by increasing the version number ``jekyll _3.3.1_ new your-new-empty-directory`` or just completely omitting the version. So now after that I do a build and am given another error stating I need to ``bundle update`` for any missing gems related to my version of Jekyll installed. I do a ``bundle update``, do a ``bundle exec jekyll serve`` and: 

````
C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/posix-spawn-0.3.12/lib/posix/spawn.rb:164: warning: cannot close fd before spawn
'which' is not recognized as an internal or external command,
operable program or batch file.
  Liquid Exception: undefined method '[]' for nil:NilClass in _posts/2016-11-24-welcome-to-jekyll.markdown
jekyll 2.4.0 | Error:  undefined method '[]' for nil:NilClass
````

I've read apparently you can ignore the "which" error and [that this issue is caused by 'highlighter'](https://github.com/jekyll/jekyll/issues/2678#issuecomment-51685950), so to fix the issue I guess I... add highlighter to the config. Rerunning the same process, I of course get another error stating an 'included file could not be found' linked somewhere in a template. Pretty curious since I used jekyll itself to generate the project template directories, I remove the reference to the nonexistent  file and the server starts, but the index won't resolve nor is any error thrown indicating a missing resource or any proof that the page was visited. There is no mention of an error in the console, and when I visit the page no response is given. I would assume this is some sort of runtime error or lack of path routing.

...

Well anyways, looking at the bigger picture here it seems like the template that jekyll provides by default for a new project is really empty anyway and I got both ruby and jekyll cooperating, so I'll continue my work by branching off another source to get the blog going. I find [jekyll bootstrap](https://github.com/plusjade/jekyll-bootstrap/) which just provides some basic css theming and other goodies, and is actually recommended by GitHub Pages anyway. Comparing this projects directory to the ``jekyll new`` generated directory, the default template was missing a few things to make any content displayed which im assuming what was going on when nothing was being resolved.

Alright, I clone the project, ``jekyll serve`` and

````
[2016-11-24 22:28:50] ERROR '/assets/themes/bootstrap-3/bootstrap/css/bootstrap.min.css' not found.
[2016-11-24 22:28:50] ERROR '/assets/themes/bootstrap-3/bootstrap/css/bs-sticky-footer.css' not found.
[2016-11-24 22:28:50] ERROR '/assets/themes/bootstrap-3/bootstrap/css/bootstrap-theme.min.css' not found.
[2016-11-24 22:28:50] ERROR '/assets/themes/bootstrap-3/css/style.css' not found.
[2016-11-24 22:28:50] ERROR '/assets/themes/bootstrap-3/bootstrap/js/bootstrap.min.js' not found.
[2016-11-24 22:28:50] ERROR '/assets/themes/bootstrap-3/bootstrap/js/bootstrap.min.js' not found.
[2016-11-24 22:28:50] ERROR '/favicon.ico' not found.
````

The folder layout for the default initial style as of cloning follows the pattern of ``/assets/themes/bootstrap/...`` but the service itself expects ``/assets/themes/bootstrap-3/bootstrap/...``, so okay... I add a parent folder and move some files in, but i'm still missing the ``/assets/themes/bootstrap-3/css/...`` folder which I'm assuming is the user's css/js files. I create an empty file in ``/bootstrap-3/css/style.css`` and wow, we got a web page here. I realized that I forgot to do a ``bundle exec`` in front of the ``jekyll serve`` but I guess that doesn't matter anymore.

---

## Putting it on Github

So, everything I did before was just to try and get a stable development environment on my computer if I want to make changes locally before pushing to master, but **that isn't actually necessary to hosting the page**. Below, I'll show all the steps I took from zero to live at <http://blog.dukemiller.net> with a few commands and comments along the way.

Now that I have the base template for the page for blogging, let's set it up on a github project pages site. Starting off, I went to github and created a new empty repository named "blog". Going to the settings of this repository, I go to the "Github Pages" section and click "Master Branch", signaling that the source for the jekyll page will be the repository master branch. Right below that I go down to "Custom domain" and set the domain to "blog.dukemiller.net". 

After that's set up, now I push the code to the repository. So, if I were to automate this as a series of commands (in windows batch ...), starting right from cloning the repository:

````batch
:: clone directory, remove history
git clone https://github.com/plusjade/jekyll-bootstrap.git
rename jekyll-bootstrap blog
rmdir /s /q "blog/.git" /s
cd blog

:: temporarily fix the misalligned naming scheme for the default template
mkdir assets\themes\bootstrap-3
move assets\themes\bootstrap assets\themes\bootstrap-3\bootstrap
mkdir assets\themes\bootstrap-3\css
echo. 2>assets\themes\bootstrap-3\css\style.css

:: edit the details of the config
_config.yml
````

In the config there are a few things to edit, notably what I changed is the highlighter from "pygments" to "rouge" because GitHub disallows it. I also change the production url.

Then, after editing, I:

````batch
:: create the repository
git init
git remote add origin https://github.com/dukemiller/blog.git
git fetch
git add .
git commit -m "Initial commit."
git push -u origin master
```` 

All that's left is to change the DNS records by adding a CNAME record on whatever domain name provider you use. I set a CNAME on hostname "blog" to "dukemiller.github.io". 

--- 

## Conclusion

Well, that's all that went into to the barebones creation of the blog. I worded my considerations, sought out some options, found a viable solution, set up a development environment and configured and put it on the web. A little knowledge into using Jekyll and theming was necessary for configuration, but that process is mostly trivial google checking. Hopefully how I dealt with problems can be helpful for someone.
