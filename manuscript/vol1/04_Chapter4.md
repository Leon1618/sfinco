Sfinco Guides  ·  Volume 1 — iPhone Protection  ·  Chapter 4


# App permissions


What your apps can see — and how to take back control

Every time you install a new app on your iPhone, it may ask for your permission to access certain parts of your phone — your location, your camera, your microphone, your contacts. You have probably tapped Allow without thinking too much about it, because the app was asking right at the moment you were trying to use it and the request seemed reasonable.

But over months and years of installing apps, those permissions accumulate. Many of them are no longer needed. Some were never needed. And a small number of them are being used in ways that would surprise you.

This chapter explains what each permission actually means in plain English, shows you how to do a full audit of what your apps can currently access, and walks you through revoking anything that should not be there. The whole process takes about fifteen minutes and is one of the most worthwhile things you can do for your privacy.

> **▶ SOUNDS FAMILIAR?**
>
> A woman in her late sixties downloaded a free flashlight app from the App Store. She granted it access to her location and contacts because the app requested them at install. She never questioned it — a flashlight seems harmless. Six months later, a family member with a background in IT checked her phone and found the app had been sending her contact list to servers overseas every 48 hours. The app was removed from the App Store shortly after. Her contacts had already been harvested. The permission was granted in a single tap. It took eighteen months to notice.
>
> *This is a composite example, built from patterns commonly reported about app permission abuse, not a specific real person. If it sounds familiar, that's exactly the point.*




## What are app permissions?


When an app asks for permission to access something on your phone, iOS shows you a pop-up message explaining what it wants and why. You have three choices: Allow, Don't Allow, or — for location — Allow Once, Allow While Using App, or Always.

What many people do not realise is that these permissions can be changed at any time, even after you have granted them. You are never permanently locked in to a choice you made at install. Revoking a permission is just as easy as granting one — and the app continues to work for everything it actually needs.

> **ℹ DID YOU KNOW?**
>
> iOS is designed so that apps can only access the permissions you explicitly grant. Unlike some other operating systems, an iPhone app cannot secretly access your camera or microphone without your permission — and iOS shows a coloured dot at the top of your screen whenever your camera (green) or microphone (orange) is actively being used. If you see one of these dots when no app should be recording, investigate immediately.



*[ SCREENSHOT: iPhone status bar showing green dot (camera in use) and orange dot (microphone in use) ]*



The green dot means an app is currently using your camera. The orange dot means your microphone is active. Swipe down from the top-right corner to see which app is responsible.


## The permission reference guide


Before we do the audit, here is a plain-English explanation of every major permission your iPhone can grant — what it actually means, and when it is reasonable to allow it.

| Permission | What it actually means | Allow only when... |
| --- | --- | --- |
| 📍 Location | What it means The app can see where you are — your suburb, street, or exact GPS coordinates, depending on the setting chosen. | Allow when... Maps, navigation, weather, food delivery, rideshare. Deny for games, shopping, news, and social media unless there is a clear reason. |
| 📷 Camera | What it means The app can activate your camera and capture photos or video. | Allow when... Camera apps, video calling (FaceTime, Zoom), QR code scanners, banking apps that photograph documents. Deny for apps that have no obvious reason to use a camera. |
| 🎤 Microphone | What it means The app can listen through your microphone — including when the app is open in the background. | Allow when... Voice and video calling apps, voice memo apps, dictation tools. Deny for shopping, games, and social media apps unless you actively use voice features. |
| 👥 Contacts | What it means The app can read the names, phone numbers, and email addresses of everyone in your contacts list. | Allow when... Calling and messaging apps (Phone, Messages, WhatsApp). Deny for almost everything else — there is rarely a legitimate reason for a game or shopping app to need your contacts. |
| 🖼 Photos | What it means The app can view your photo library. 'Full Access' means all photos; 'Selected Photos' means only what you choose to share. | Allow when... Photo editing apps, printing services, apps where you upload images. Always choose 'Selected Photos' rather than 'Full Access' where possible. |
| 🔵 Bluetooth | What it means The app can use Bluetooth — which also allows it to detect your location indirectly via Bluetooth beacons in shops and public spaces. | Allow when... Wireless headphone apps, fitness trackers, smart home devices. Deny for apps that have no obvious need for wireless connectivity. |
| 👁 Tracking | What it means The app wants to track your activity across other apps and websites to build an advertising profile about you. | Allow when... Almost never. iOS will ask you to Allow Tracking or Ask App Not to Track. Choose Ask App Not to Track for almost every app, every time. |
| ❤ Health & Fitness | What it means The app can read or write data to Apple Health — steps, heart rate, sleep, weight, and other health metrics. | Allow when... Fitness trackers, health monitoring apps, medical apps. Deny for general wellness apps that do not have a specific, clear health purpose. |

> **⚠ WARNING**
>
> Be especially cautious about granting Microphone and Contacts permissions. Microphone access in the wrong hands means an app could potentially listen to conversations near your phone. Contacts access means your friends' and family members' private details leave your device — without their knowledge or consent. Neither permission should be granted to any app that does not have an obvious, specific need for it.




## How to do a full permissions audit


There are two ways to review your app permissions in iOS. The first is by permission type — seeing which apps have access to your location, for example. The second is by app — seeing everything a single app can access. We will do both.

Method 1 — Audit by permission type

Settings path:  Settings  >  Privacy & Security

This is your permissions control centre. Every permission category is listed here. Tap any one of them to see which apps have been granted that access.

Open Settings  and tap Privacy & Security.

Tap Location Services  at the top of the list.

Review each app listed.  The setting next to each app shows what level of access it has: Never, Ask Next Time, While Using, or Always.

Tap any app  to change its location access. For most apps, While Using is the safest option if they need location at all.

Go back to Privacy & Security  and repeat for Camera, Microphone, Contacts, and Photos.

*[ SCREENSHOT: Settings > Privacy & Security > Location Services showing list of apps with their access levels ]*



The Location Services screen shows every app with location access and what level they have been granted. 'Always' means the app can track your location even when you are not using it — this is rarely necessary.

> **★ TIP**
>
> Work through these five permissions in order: Location, Camera, Microphone, Contacts, Photos. For each one, ask yourself: does this app genuinely need this to work properly? If the answer is no — or if you are not sure — tap it and change it to Never. You can always grant it again later if the app asks for a legitimate reason.



Method 2 — Audit by individual app

Settings path:  Settings  >  [scroll down to the app name]

If you want to see everything a specific app can access — all in one place — scroll down past the standard Settings options until you reach the alphabetical list of your installed apps. Tap any app name to see every permission it holds and toggle them on or off.

*[ SCREENSHOT: Settings screen scrolled to app list showing individual app (e.g. Facebook) with permissions listed ]*



Tapping an app in Settings shows all its permissions in one place. This is the fastest way to review — or completely revoke — everything a single app can access.

This view is particularly useful for social media apps and games, which often accumulate a long list of permissions over time. It is common to find that a social media app has been granted access to your camera, microphone, contacts, location, and photo library — often because you tapped Allow years ago during a specific feature and forgot.


## The App Privacy Report — seeing what apps are actually doing


iOS includes a feature called the App Privacy Report that goes beyond what permissions are granted — it shows you what apps are actually doing with them. This is genuinely powerful and almost nobody knows it exists.

When enabled, it keeps a running record of every time an app accesses your location, camera, microphone, contacts, or photos — and every third-party domain the app contacts over the network.

Settings path:  Settings  >  Privacy & Security  >  App Privacy Report

Open Settings  and tap Privacy & Security.

Scroll down and tap App Privacy Report.

Tap Turn On App Privacy Report.

Wait 24–48 hours  then return to this screen to see a full record of what your apps have been doing.

*[ SCREENSHOT: App Privacy Report screen showing app activity — frequency of location access, network contacts ]*



The App Privacy Report records every time an app accesses a sensitive permission and every external domain it connects to. Anything accessing your location or microphone frequently — especially when you are not actively using the app — deserves a closer look.

> **ℹ DID YOU KNOW?**
>
> The App Privacy Report does not block anything — it simply records it. Think of it as a security camera for your phone's permissions. If you see an app frequently accessing your location or microphone at odd hours, that is a strong signal to either revoke that permission or delete the app entirely.




## Tracking — the one permission that deserves special attention


Tracking is different from the other permissions. It does not give an app access to a feature of your phone — instead, it allows the app to follow your activity across other apps and websites, building a detailed profile of your interests, habits, and behaviour that is then used for targeted advertising.

Apple introduced the App Tracking Transparency framework in 2021, which requires apps to ask your permission before tracking you. You can also set a default answer for all apps at once.

Settings path:  Settings  >  Privacy & Security  >  Tracking

Open Settings  and tap Privacy & Security.

Tap Tracking.

Toggle off Allow Apps to Request to Track.  This will automatically deny tracking requests from all apps without showing you the pop-up.

*[ SCREENSHOT: Settings > Privacy & Security > Tracking screen with 'Allow Apps to Request to Track' toggled OFF ]*



Turning off 'Allow Apps to Request to Track' means apps can no longer ask you for tracking permission — and any app that already had it will have that permission automatically revoked.

> **✓ WELL DONE IF YOU HAVE THIS**
>
> Turning off tracking does not break any app functionality. It simply means the apps on your phone can no longer follow you around the internet building an advertising profile. The apps still work exactly as they should — you just see less targeted advertising, and your browsing habits stay private.




## Which apps to look at most closely


Not all apps carry equal risk. Here are the categories worth paying closest attention to during your audit:

Free games

Free games are one of the most common sources of unnecessary permission grants. They frequently request location, contacts, and microphone access for features that have nothing to do with playing the game — often to serve targeted advertising. Review every free game on your phone and revoke everything that is not obviously needed.

Social media apps

Facebook, Instagram, TikTok, and similar apps are designed to collect as much data as possible. They will often hold camera, microphone, contacts, location, and photo library access simultaneously. For social media apps, consider granting only what you actively use — for example, camera access when you are posting a photo — and revoking the rest.

Shopping and retail apps

Shopping apps rarely need microphone or contact access. Location access While Using is reasonable if you are using store-finder features, but Always location access is not. Review these carefully.

Old or unused apps

The easiest permission to miss is one held by an app you no longer use. If you have not opened an app in more than three months, either delete it or revoke all its permissions. An unused app that still holds microphone access is a risk with no benefit.

> **★ TIP**
>
> iOS has a built-in feature to automatically revoke permissions from apps you haven't used in a while. To enable it: Settings > Privacy & Security > scroll to the bottom > ensure 'Revoke Permission for Unused Apps' (or similar wording) is toggled on. This runs quietly in the background and keeps your permissions list clean over time.




## Quick review — your chapter 4 checklist


Set aside fifteen minutes with your iPhone and work through each of these. Tick them off as you go.

I have reviewed Location Services and changed any 'Always' permissions to 'While Using' or 'Never' where appropriate

I have reviewed Camera permissions and revoked access from any app that does not genuinely need it

I have reviewed Microphone permissions and revoked access from games, shopping apps, and anything else that has no clear need to listen

I have reviewed Contacts permissions and ensured only calling and messaging apps have access

I have reviewed Photos permissions and switched any 'Full Access' grants to 'Selected Photos' where possible

I have turned off 'Allow Apps to Request to Track' under Privacy & Security > Tracking

I have turned on the App Privacy Report and will check it again in 48 hours

> **✓ WELL DONE IF YOU HAVE THIS**
>
> Your apps can now only access what they genuinely need. The permissions audit is one of the most underrated privacy steps an iPhone user can take — and most people never do it. You now know more about what is on your phone than the majority of iPhone users in Australia.



What's next:  Chapter 5 covers scams, fake texts, and phishing — the most common way attackers try to get into your phone and your accounts. We look at real Australian examples, teach you the red flags that give scams away, and tell you exactly what to do if you think you have already clicked something you should not have.

sfinco.com.au

Sfinco Guides  Vol 1  ·  Chapter 4