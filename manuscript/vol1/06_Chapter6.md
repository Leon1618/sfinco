Sfinco Guides  ·  Volume 1 — iPhone Protection  ·  Chapter 6


# Wi-Fi and VPN


Staying safe on public networks — and what a VPN actually does

Most of us connect to Wi-Fi without thinking much about it. At a café, a hotel, an airport, a library — you see the network name, enter the password (or find it on a sign), and you are online. Simple.

But public Wi-Fi networks carry risks that your home network does not. And some of the settings on your iPhone that seem harmless — like automatically joining known networks — can actually expose you in ways that are not immediately obvious.

This chapter explains how Wi-Fi security works in plain English, what the real risks of public networks are (and are not), how to configure your iPhone to connect safely, and what a VPN is and when it is genuinely worth using.

> **▶ SOUNDS FAMILIAR?**
>
> A retired teacher from the Gold Coast was at a shopping centre café, using the free Wi-Fi to check her bank balance and pay a bill online. The network name was 'CafeWifi_Free' — identical to the name on the sign at the counter. What she did not know was that a second network with the same name had been set up nearby by someone with a laptop and basic software. Her internet traffic passed through that device before reaching the internet. Her banking session was visible. She was not hacked that day — but she easily could have been. This is called an 'evil twin' attack. It costs almost nothing to set up and is alarmingly common.
>
> *This is a composite example, illustrating a well-documented attack technique, not a specific real person. If it sounds familiar, that's exactly the point.*




## How public Wi-Fi works — and where the risk actually is


When you connect to a Wi-Fi network, your iPhone sends and receives data through that network's router — the box that connects the network to the internet. On a public network, that router is controlled by someone else, and in some cases, the 'router' is actually another person's device set up to intercept traffic.

The risk on public Wi-Fi is not that someone will magically break into your iPhone. It is that unencrypted data — information travelling between your phone and the internet without protection — can potentially be seen by anyone on the same network.

The good news is that most of this risk has been significantly reduced by a technology called HTTPS — the padlock you see in your browser's address bar. When a website uses HTTPS, the data between your phone and that website is encrypted, even on public Wi-Fi. Most major websites and apps now use HTTPS by default.

> **ℹ DID YOU KNOW?**
>
> HTTPS stands for HyperText Transfer Protocol Secure. When you visit a website that starts with https:// (or shows a padlock icon in Safari), your connection to that site is encrypted. This means even if someone intercepts your traffic on public Wi-Fi, they see scrambled data rather than readable information. The padlock is your first line of Wi-Fi defence. If a site shows 'Not Secure' in Safari, treat anything you type there as potentially visible.



So what are the genuine risks on public Wi-Fi today? Two main things:

Evil twin networks — fake Wi-Fi hotspots that impersonate legitimate ones, intercepting your traffic before passing it on. As in the story above, these can be created quickly and cheaply anywhere.

Unencrypted apps and older websites — some apps and websites still do not use HTTPS, meaning data sent through them on public Wi-Fi is readable by anyone on the same network.

The good news: both of these risks are manageable with a few simple habits and settings.


## The risks of auto-join and known networks


Your iPhone keeps a list of every Wi-Fi network you have ever connected to. By default, when one of those networks is within range, your phone joins it automatically — without asking you.

This is convenient at home. But it creates a problem in public: if someone creates a fake network with the same name as one you have connected to before — say, 'Telstra Air' or 'McDonald's Free WiFi' — your phone may join it automatically without you noticing.

How to manage auto-join for saved networks

Settings path:  Settings  >  Wi-Fi  >  tap the (i) next to any saved network

For any public network you have saved — cafes, hotels, shopping centres, airports — it is worth turning off Auto-Join. This means your phone will not connect to that network again without you explicitly choosing it.

Open Settings  and tap Wi-Fi.

Find a saved public network in the list  (any network with a checkmark that you connected to outside your home).

Tap the blue (i) icon  to the right of the network name.

Toggle off Auto-Join.

Repeat for all public networks  in your saved list.

*[ SCREENSHOT: Settings > Wi-Fi showing saved network detail screen with Auto-Join toggled OFF ]*



The network detail screen for a saved public Wi-Fi network. Turning off Auto-Join means your phone will not silently connect to this network — or a fake version of it — without your knowledge.

> **★ TIP**
>
> Your home and work networks are the only ones worth keeping Auto-Join turned on for. For every other saved network — cafés, gyms, hotels, airports — turn Auto-Join off. You can still connect to them when you choose; your phone just will not do it silently.



Ask to join networks

Settings path:  Settings  >  Wi-Fi  >  Ask to Join Networks

This setting controls whether your iPhone asks before joining new networks it has not seen before. The recommended setting is Ask — this way your phone prompts you rather than automatically connecting to any open network it finds.

*[ SCREENSHOT: Settings > Wi-Fi showing 'Ask to Join Networks' set to Ask ]*



With 'Ask to Join Networks' set to Ask, your iPhone will prompt you before connecting to any new network — giving you a moment to consider whether you actually want to join it.


## Safe habits on public Wi-Fi


Good Wi-Fi security is less about technical settings and more about simple habits. Here are the ones that make the biggest difference.

| ⚠  Risky behaviour | ✓  Safer choice |
| --- | --- |
| Logging in to your bank on café Wi-Fi without a VPN | Use mobile data (4G/5G) for banking — it is significantly more secure than public Wi-Fi |
| Staying connected to public Wi-Fi all day without thinking about it | Connect only when you need it, then turn Wi-Fi off or switch back to mobile data |
| Joining any open network with a familiar-sounding name | Check the exact network name with a staff member before connecting |
| Shopping online and entering card details on public Wi-Fi | Save online shopping for your home network or use Apple Pay, which does not transmit your card number |
| Assuming the padlock icon means the website is trustworthy | The padlock means the connection is encrypted — not that the site itself is legitimate. Scam sites can have padlocks too. |
| Using the same Wi-Fi password at home for years | Change your home Wi-Fi password every 12–18 months and use WPA3 or WPA2 security if your router supports it |


> **⚠ WARNING**
>
> The single highest-risk activity on public Wi-Fi is mobile banking. Even with HTTPS, the combination of an unknown network, a potentially intercepted connection, and a banking session is a risk not worth taking. Use your mobile data — 4G or 5G — for banking when you are away from home. It is encrypted end-to-end and does not pass through a shared public router.




## Your home Wi-Fi — the settings worth checking


Your home network is generally much safer than public Wi-Fi — but only if it is configured correctly. Here are the settings on your home router worth verifying.

Use a strong, unique Wi-Fi password

Your home Wi-Fi password should be at least 12 characters, not a word from the dictionary, and not the default password printed on the back of your router. Default passwords are publicly listed for most router models and are one of the first things someone will try.

To change your Wi-Fi password, log in to your router's admin page — usually by typing 192.168.0.1 or 192.168.1.1 into a browser on your home network. Your router's manual or your internet service provider can guide you through this.

Use WPA3 or WPA2 security

Wi-Fi networks can use different security protocols — the system that encrypts your wireless traffic. WPA3 is the current standard and the most secure. WPA2 is also acceptable. WEP and WPA (without the number) are older, weaker, and should be avoided if possible.

Check your router's security setting in its admin page and upgrade to WPA3 or WPA2 if you are using an older protocol.

Set up a guest network for visitors

Most modern routers allow you to create a separate guest Wi-Fi network — a second network that visitors can use without being able to access your main network or the devices on it. This is particularly useful if you have smart home devices, a printer, or a computer connected to your home network that you would rather keep separate from guest devices.

Check your router's app or admin page for a Guest Network option. It usually takes under five minutes to set up.

> **★ TIP**
>
> Smart home devices — TVs, doorbells, thermostats, robot vacuums — are often less securely built than phones and computers. Putting them on a guest network keeps them isolated from your phone, laptop, and any sensitive data on your main network. This is called network segmentation, and it is one of the smartest home security steps most people have never heard of.




## What is a VPN — in plain English


VPN stands for Virtual Private Network. It sounds technical, but the concept is simple.

Normally, when your iPhone sends data to the internet, that data travels from your phone, through whatever network you are on (home Wi-Fi, café Wi-Fi, or mobile data), and out to the website or app you are using. Anyone who can see the traffic on that network can potentially see what you are doing — though HTTPS limits how much they can actually read.

A VPN adds a layer to this journey. It creates an encrypted tunnel between your phone and a server operated by the VPN provider. All your traffic travels through that tunnel before going to the internet. This means:

Anyone on the same Wi-Fi network as you sees only encrypted tunnel traffic — not what you are actually doing

The website or app you are visiting sees the VPN server's location, not your actual location

Your internet service provider cannot see your browsing activity

*[ SCREENSHOT: Simple diagram: iPhone → encrypted VPN tunnel → VPN server → internet (vs iPhone → public Wi-Fi → internet without VPN) ]*



A VPN creates an encrypted tunnel between your phone and a server, so anyone monitoring the network between you and the internet sees only scrambled data. Think of it as a private, sealed pipe through a public space.

When a VPN is genuinely useful

Using public Wi-Fi in cafés, airports, hotels, or shopping centres — especially for anything sensitive

Travelling overseas and wanting to access Australian services

Adding an extra layer of privacy on your home network

Using banking or financial apps away from your home network

When a VPN is not the answer

A VPN does not protect you from phishing — clicking a scam link still takes you to the scam site

A VPN does not replace a strong passcode or two-factor authentication

A VPN does not make an untrustworthy website trustworthy

A free VPN is often worse than no VPN — many free VPN services make money by logging and selling your browsing data, which defeats the purpose entirely

> **⚠ WARNING**
>
> Never use a free VPN from an unknown provider. Free VPNs have to make money somehow — and many do it by recording everything you do and selling that data to advertisers or third parties. A paid VPN from a reputable provider costs less than a coffee per week and does not harvest your data. The free ones often do the opposite of what you want.




## Which VPN to choose — a plain-English comparison


There are hundreds of VPN providers. Here are four reputable options suitable for everyday Australian iPhone users, compared simply.

| VPN Provider | Cost | Best for |
| --- | --- | --- |
| Mullvad | ~AU$8/mo | Privacy-first, no account required, no logs, accepts cash payment. Best for maximum anonymity. |
| ProtonVPN | Free tier / ~AU$12/mo | Swiss-based, strong privacy laws, free tier available with limited servers. Good for everyday use. |
| ExpressVPN | ~AU$15/mo | Very fast, easy to use, good Australian server coverage. Best for streaming and travel. |
| NordVPN | ~AU$7/mo (annual) | Popular, reliable, good value on annual plan. Solid choice for most everyday users. |


How to install and use a VPN on your iPhone

Choose a VPN provider  from the table above and subscribe via their official website.

Download their iPhone app  from the App Store — search for the provider name and look for the official app.

Open the app and sign in  with the account you created.

Tap Connect  to start the VPN. A VPN icon (a small box with a key) will appear in your status bar when it is active.

Use the VPN whenever you are on public Wi-Fi.  Most VPN apps have an Auto-Connect on Untrusted Networks setting — enable this so the VPN turns on automatically whenever you join a public network.

*[ SCREENSHOT: iPhone status bar showing VPN icon active, alongside Wi-Fi connected to public network ]*



When a VPN is active, a small 'VPN' label appears in your iPhone's status bar. This confirms your traffic is travelling through the encrypted tunnel.

> **✓ WELL DONE IF YOU HAVE THIS**
>
> A VPN running on public Wi-Fi, combined with HTTPS websites and mobile data for banking, covers the vast majority of real-world Wi-Fi security risks. You do not need to be connected to a VPN at home on your own secured network — save it for when you are out and about, and make it automatic on public networks.




## Quick review — your chapter 6 checklist


I have reviewed my saved Wi-Fi networks and turned off Auto-Join for all public networks

My Ask to Join Networks setting is set to Ask

I use mobile data (4G/5G) rather than public Wi-Fi when accessing my bank or making payments away from home

My home Wi-Fi uses a strong, unique password (not the default router password)

I have considered setting up a guest network for visitors and smart home devices

I understand what a VPN does and have either installed one or noted it as a next step

I know never to use a free VPN from an unknown provider

> **✓ WELL DONE IF YOU HAVE THIS**
>
> Your Wi-Fi habits and settings are now significantly stronger. Most people never think about this until something goes wrong. The combination of good habits — mobile data for banking, auto-join off, a reputable VPN on public networks — is more than enough for everyday protection.



What's next:  Chapter 7 covers what to do if your iPhone is ever lost or stolen — setting up Find My correctly, understanding Activation Lock, and the step-by-step actions to take in the critical first thirty minutes after your phone goes missing.

sfinco.com.au

Sfinco Guides  Vol 1  ·  Chapter 6