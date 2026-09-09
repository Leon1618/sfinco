Sfinco Guides  ·  Volume 2 — MacBook Protection  ·  Chapter 4


# Gatekeeper and app permissions


What your Mac can see — and how to take back control


Every time you install a new application, or open one for the first time, macOS asks you a question: should this app be allowed to run, and what should it be allowed to see? Two systems handle these questions — Gatekeeper, which checks where an app came from, and Privacy & Security permissions, which control what a running app can access. This chapter walks through both.


## Gatekeeper — checking where your apps came from

Gatekeeper is a built-in macOS feature that checks whether an app has been verified by Apple before letting it run. Every app distributed through the App Store is automatically checked. Apps distributed outside the App Store can still run, but only if the developer has registered with Apple and "notarised" the app, a process where Apple scans it for known malware.

Settings path:  System Settings  >  Privacy & Security  >  scroll to Security, where you can see which sources of apps are currently allowed.

![Privacy and Security settings showing the Security section with App Store and identified developers allowed](screenshots/ch4-gatekeeper-settings.png)

*Mockup illustration, styled to match macOS Sequoia — reshoot on a real Mac before final layout.*

| ⚠  WARNING If your Mac ever asks "Are you sure you want to open this application?" for something you did not deliberately choose to download, or if you have to disable Gatekeeper entirely to run something, treat that as a serious red flag. Legitimate, mainstream software almost never requires this. |

★  TIP:  When in doubt, download software directly from the developer's official website — typed into your browser yourself, not clicked from a search ad or a pop-up — or from the App Store. Avoid "download" buttons on random file-sharing sites, since these are one of the most common ways Mac malware spreads.


## The permission reference guide

Beyond Gatekeeper, individual apps can request access to specific parts of your Mac. Here is a plain-English explanation of the permissions you will see most often.

| Permission | What it actually means | Allow only when... |
| --- | --- | --- |
| Camera | The app can activate your Mac's built-in or connected camera | Video calling apps like FaceTime or Zoom. Deny for apps with no obvious reason to use a camera |
| Microphone | The app can listen through your Mac's microphone | Voice and video calling apps, dictation tools. Deny for anything else unless you actively use voice features |
| Screen Recording | The app can see and record everything shown on your screen | Screen-sharing and recording tools you trust. This is one of the most sensitive permissions on the Mac — it can capture passwords as you type them |
| Full Disk Access | The app can read every file on your Mac, including other apps' data | Backup software and system utilities from well-known developers. Almost nothing else needs this |
| Accessibility | The app can control your Mac, simulating clicks and keystrokes | Assistive tools and some automation apps. This permission can be misused to take control of your Mac, so grant it sparingly |
| Files and Folders | The app can access specific folders like Desktop, Documents, or Downloads | Apps that genuinely need to open or save your files, like word processors or photo editors |

![Privacy and Security settings showing the Screen Recording panel with the list of apps and their access](screenshots/ch4-screen-recording.png)

*Mockup illustration, styled to match macOS Sequoia — reshoot on a real Mac before final layout.*

| ⚠  WARNING Be especially cautious about granting Screen Recording and Full Disk Access. An app with Screen Recording access can see everything on your screen, including passwords as you type them into other apps. Full Disk Access can read files belonging to other applications, including your Mail and Messages databases. Neither should be granted to any app that does not have an obvious, specific need for it. |


## How to do a full permissions audit

Settings path:  System Settings  >  Privacy & Security  takes you to a list of every permission category. Work through each one — Camera, Microphone, Screen Recording, Files and Folders, and so on — and review which apps are listed.

What many people do not realise is that these permissions can be changed at any time, even long after you granted them. You are never permanently locked in to a choice you made at install. Revoking a permission is just as easy as granting one, and the app continues to work for everything it actually needs.

![Privacy and Security main settings screen showing the full list of permission categories](screenshots/ch4-privacy-security-overview.png)

*Mockup illustration, styled to match macOS Sequoia — reshoot on a real Mac before final layout.*


## Which apps to look at most closely

Not all apps carry equal risk. Give particular attention to: apps you downloaded from outside the App Store, apps you installed once for a single task and have not opened since, browser extensions, which often request broad access to everything you view online, and any app you do not clearly remember installing yourself.

| ✓  WELL DONE IF YOU HAVE THIS If your apps list under each permission category is short, and every app on it is something you recognise and actively use, your Mac's permission footprint is already in very good shape. |


## Quick review — your chapter 4 checklist

| Done | Item |
| --- | --- |
| ☐ | I only install software from the App Store or official developer websites |
| ☐ | I have reviewed the Screen Recording and Full Disk Access lists for anything unfamiliar |
| ☐ | I have reviewed the Accessibility list for anything unfamiliar |
| ☐ | I have removed permissions from apps I no longer use |
| ☐ | I have deleted any apps I do not recognise or no longer use |

With your apps under control, the next chapter turns to the scams and phishing attempts most likely to actually reach you.
