Sfinco Guides  ·  Volume 4: Windows Protection  ·  Chapter 6


# Wi-Fi, Windows Firewall and VPN


Staying safe on public networks, and locking down file sharing at home


Most of us connect a laptop to Wi-Fi without thinking much about it. At a cafe, a library, an airport lounge, you see the network name, enter the password if there is one, and you are online. This chapter covers what is actually happening when you do that, and the handful of settings that make it safe.


## How public Wi-Fi works, and where the risk actually is

Public Wi-Fi networks are, by their nature, shared with everyone else in the room. On an unencrypted or poorly secured network, someone with the right knowledge and software nearby can potentially see some of the data travelling between your PC and the internet.

The good news is that most websites and apps you use today, including all banking websites, use HTTPS encryption, shown as a padlock in your browser's address bar, which protects the content of your connection even on an open network. The remaining risk sits mostly with older or poorly built apps and websites that do not use HTTPS properly, and with a specific trick called an Evil Twin network.

| ℹ  DID YOU KNOW? An Evil Twin is a fake Wi-Fi network set up by an attacker to mimic a legitimate one, for example, "Cafe_Free_WiFi" instead of the cafe's real "CafeWiFi" network. If your PC connects to the fake network, the attacker can see much more of your traffic than they could on the genuine one. |


## Setting your network to "Public"

Windows asks whether a new network is "Private" or "Public" the first time you connect. This single setting controls how visible your PC is to others on the same network.

Settings path:  Settings  >  Network & Internet  >  Wi-Fi  >  select the network  >  Network profile type.

![Windows network settings showing the network profile set to Public](screenshots/ch6-network-profile.png)

*Illustrative mockup, styled to match Windows 11, not a real PC screen.*

★  TIP:  Always choose "Public" for cafes, airports, and any network you do not personally manage. Reserve "Private" only for your own home or work network, where you trust the other devices connected to it.


## Turning on Windows Firewall

Windows Firewall blocks unwanted incoming connections to your PC from the network. It is turned on by default on most PCs, but it is worth confirming.

Settings path:  Settings  >  Privacy & Security  >  Windows Security  >  Firewall & network protection.

![Windows Security app showing Firewall and network protection turned on for all network types](screenshots/ch6-firewall.png)

*Illustrative mockup, styled to match Windows 11, not a real PC screen.*

| ✓  WELL DONE IF YOU HAVE THIS With the firewall turned on for all three network types, Domain, Private, and Public, unsolicited connection attempts are blocked automatically, before they ever reach an application on your PC. |


## File sharing, a setting worth checking on public networks

If you use file or printer sharing at home with other devices on your own network, these settings should automatically turn off when your network profile is set to Public, but it is worth confirming directly.

Settings path:  Control Panel  >  Network and Sharing Center  >  Advanced sharing settings.

| Sharing option | Recommended when on public Wi-Fi |
| --- | --- |
| Network discovery | Off |
| File and printer sharing | Off |
| Public folder sharing | Off |

| ⚠  WARNING Leaving file or printer sharing turned on while connected to public Wi-Fi means other devices on that same network may be able to see your shared folders. These features are designed for trusted home or office networks, not a cafe or airport. |


## What is a VPN, in plain English

A VPN, or Virtual Private Network, is a service that encrypts all of your PC's internet traffic and routes it through a secure server before it reaches the internet. This means the website or app you are visiting sees the VPN server's location, not your actual location, and anyone else on the same Wi-Fi network cannot see your browsing activity at all.

![Diagram comparing a PC's connection on public Wi-Fi with and without a VPN](screenshots/ch6-vpn-diagram.png)


## Which VPN to choose, a plain-English comparison

There are hundreds of VPN providers. Here are four reputable options with native Windows apps, compared simply.

| VPN Provider | Cost | Best for |
| --- | --- | --- |
| Mullvad | ~AU$8/mo | Privacy-first, no account required, no logs, accepts cash payment. Best for maximum anonymity |
| ProtonVPN | Free tier / ~AU$12/mo | Swiss-based, strong privacy laws, free tier available with limited servers. Good for everyday use |
| ExpressVPN | ~AU$15/mo | Very fast, easy to use, good Australian server coverage. Best for streaming and travel |
| NordVPN | ~AU$7/mo (annual) | Popular, reliable, good value on annual plan. Solid choice for most everyday users |


## How to install and use a VPN on your PC

Choose a VPN provider from the table above and subscribe through their official website. Download their Windows app directly from the provider's website or the Microsoft Store. Open the app and sign in with the account you created. Click Connect to start the VPN, a small icon will usually appear in your system tray when it is active. Use the VPN whenever you are on public Wi-Fi, and consider enabling any "auto-connect on untrusted networks" option the app offers.

| ✓  WELL DONE IF YOU HAVE THIS A VPN running on public Wi-Fi, combined with your firewall turned on and your network profile set to Public, covers the vast majority of real-world network security risks for a Windows PC. |


## Quick review, your chapter 6 checklist

| Done | Item |
| --- | --- |
| ☐ | My network profile is set to Public on unfamiliar networks |
| ☐ | Windows Firewall is turned on for all network types |
| ☐ | File and printer sharing are off when I am on public Wi-Fi |
| ☐ | I have a VPN installed and use it on public networks |

With your network settings squared away, the next chapter covers backups and exactly what to do if your PC is ever compromised, lost, or stolen.
