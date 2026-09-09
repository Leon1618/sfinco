Sfinco Guides  ·  Volume 2 — MacBook Protection  ·  Chapter 6


# Wi-Fi, the firewall and VPN


Staying safe on public networks — and locking down file sharing at home


Most of us connect a laptop to Wi-Fi without thinking much about it. At a cafe, a library, an airport lounge — you see the network name, enter the password if there is one, and you are online. This chapter covers what is actually happening when you do that, and the handful of settings that make it safe.


## How public Wi-Fi works — and where the risk actually is

Public Wi-Fi networks are, by their nature, shared with everyone else in the room. On an unencrypted or poorly secured network, someone with the right knowledge and software nearby can potentially see some of the data travelling between your Mac and the internet.

The good news is that most websites and apps you use today, including all banking websites, use HTTPS encryption, shown as a padlock in your browser's address bar, which protects the content of your connection even on an open network. The remaining risk sits mostly with older or poorly built apps and websites that do not use HTTPS properly, and with a specific trick called an Evil Twin network.

| ℹ  DID YOU KNOW? An Evil Twin is a fake Wi-Fi network set up by an attacker to mimic a legitimate one — for example, "Cafe_Free_WiFi" instead of the cafe's real "CafeWiFi" network. If your Mac connects to the fake network, the attacker can see much more of your traffic than they could on the genuine one. |


## Safe habits on public Wi-Fi

Turn off Auto-Join for networks you do not use regularly, so your Mac does not silently reconnect to a network you connected to once, months ago, that may no longer be safe.

Settings path:  System Settings  >  Wi-Fi  >  click the (i) next to a saved network to see Auto-Join.

![Wi-Fi settings showing a saved network's detail screen with Auto-Join toggled off](screenshots/ch6-wifi-autojoin.png)

*Mockup illustration, styled to match macOS Sequoia — reshoot on a real Mac before final layout.*

Confirm the network name with staff before connecting, rather than picking the first similar-looking name you see. Avoid logging in to banking sites on public Wi-Fi without a VPN, covered later in this chapter. Turn on your Mac's firewall, covered next, before you connect to any network you do not fully trust.


## Turning on your Mac's firewall

macOS includes a built-in firewall that blocks unwanted incoming connections to your Mac from the network. It does not slow down your normal browsing at all, and it is not turned on by default on most Macs.

Settings path:  System Settings  >  Network  >  Firewall.

![Network settings showing the Firewall pane with the firewall turned on](screenshots/ch6-firewall-settings.png)

*Mockup illustration, styled to match macOS Sequoia — reshoot on a real Mac before final layout.*

| ✓  WELL DONE IF YOU HAVE THIS With the firewall turned on, unsolicited connection attempts from the network — including from other devices on a shared public Wi-Fi network — are blocked automatically, before they ever reach an application on your Mac. |


## File Sharing — a setting worth checking on public networks

If you use File Sharing, Screen Sharing, or Printer Sharing at home to share files or your screen with other devices on your own network, it is worth turning these off, or setting your network location to "Public," whenever you connect to a network outside your home or office.

Settings path:  System Settings  >  General  >  Sharing.

| Sharing option | Recommended when on public Wi-Fi |
| --- | --- |
| File Sharing | Off |
| Screen Sharing | Off |
| Printer Sharing | Off |
| Remote Login | Off, unless you specifically use it and understand the risk |

| ⚠  WARNING Leaving File Sharing or Screen Sharing turned on while connected to public Wi-Fi means other devices on that same network may be able to see your shared folders or attempt to connect to your screen. These features are designed for trusted home or office networks, not a cafe or airport. |


## What is a VPN — in plain English

A VPN, or Virtual Private Network, is a service that encrypts all of your Mac's internet traffic and routes it through a secure server before it reaches the internet. This means the website or app you are visiting sees the VPN server's location, not your actual location, and anyone else on the same Wi-Fi network cannot see your browsing activity at all, since it is wrapped inside the encrypted tunnel before it ever reaches the shared network.

![Diagram comparing a Mac's connection on public Wi-Fi with and without a VPN](screenshots/ch6-vpn-diagram.png)


## Which VPN to choose — a plain-English comparison

There are hundreds of VPN providers. Here are four reputable options with native Mac apps, compared simply.

| VPN Provider | Cost | Best for |
| --- | --- | --- |
| Mullvad | ~AU$8/mo | Privacy-first, no account required, no logs, accepts cash payment. Best for maximum anonymity |
| ProtonVPN | Free tier / ~AU$12/mo | Swiss-based, strong privacy laws, free tier available with limited servers. Good for everyday use |
| ExpressVPN | ~AU$15/mo | Very fast, easy to use, good Australian server coverage. Best for streaming and travel |
| NordVPN | ~AU$7/mo (annual) | Popular, reliable, good value on annual plan. Solid choice for most everyday users |

| ℹ  DID YOU KNOW? Apple's own iCloud Private Relay, available with iCloud+ subscriptions, offers partial VPN-like protection for Safari browsing specifically — it hides your IP address and encrypts your DNS requests. It does not cover all apps the way a full VPN does, but it is a useful extra layer if you already subscribe to iCloud+. |


## How to install and use a VPN on your Mac

Choose a VPN provider from the table above and subscribe through their official website. Download their Mac app directly from the provider's website or the App Store. Open the app and sign in with the account you created. Click Connect to start the VPN — a small icon will usually appear in your menu bar when it is active. Use the VPN whenever you are on public Wi-Fi, and consider enabling any "auto-connect on untrusted networks" option the app offers.

| ✓  WELL DONE IF YOU HAVE THIS A VPN running on public Wi-Fi, combined with your firewall turned on and File Sharing off, covers the vast majority of real-world network security risks for a Mac. You do not need to run a VPN at home on your own secured network — save it for when you are out and about. |


## Quick review — your chapter 6 checklist

| Done | Item |
| --- | --- |
| ☐ | Auto-Join is off for networks I do not use regularly |
| ☐ | My Mac's firewall is turned on |
| ☐ | File Sharing and Screen Sharing are off when I am on public Wi-Fi |
| ☐ | I have a VPN installed and use it on public networks |

With your network settings squared away, the next chapter covers Time Machine backups and exactly what to do if your Mac is ever lost or stolen.
