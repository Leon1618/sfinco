Sfinco Guides  ·  Volume 4 — Windows Protection  ·  Chapter 2


# Locking the front door


Your PIN, Windows Hello, and the encryption setting most people never turn on


Every protection in this book sits behind one gate: the login screen. If someone can turn on your PC and get straight to your desktop with no password or PIN, nothing else in this book matters very much. This chapter covers the layers that make that gate a genuine barrier, plus one setting that protects your files even if your PC is physically stolen.


## Layer 1 — Your PIN or password

Settings path:  Settings  >  Accounts  >  Sign-in options.

A Windows PIN is tied to your specific device and, despite being shorter than a password, is generally considered just as secure, since it cannot be used to sign in anywhere except that one PC.

![Windows Sign-in options screen showing PIN and password settings](screenshots/ch2-signin-options.png)

*Mockup illustration, styled to match Windows 11 — reshoot on a real PC before final layout.*

★  TIP:  Choose a PIN that is not your birth year, your address number, or a simple sequence like 1234. Windows allows longer PINs and even PINs with letters and symbols if you want extra strength.

| ⚠  WARNING If your PC is set to sign in automatically with no PIN or password at all, turn this off in Sign-in options now — automatic sign-in means anyone who opens the lid or turns on the PC has full access to everything. |


## Layer 2 — Windows Hello

If your PC has a fingerprint reader or an infrared camera, Windows Hello lets you sign in with your face or fingerprint instead of typing a PIN every time.

Settings path:  Settings  >  Accounts  >  Sign-in options  >  Windows Hello.

![Windows Hello setup screen showing facial recognition and fingerprint options](screenshots/ch2-windows-hello.png)

*Mockup illustration, styled to match Windows 11 — reshoot on a real PC before final layout.*

If your PC does not support Windows Hello, a strong PIN used consistently is just as effective. Windows Hello is a convenience layer on top of your PIN, not a replacement for it — your PIN or password still works as a backup.


## Layer 3 — Screen lock timing

A PIN only protects you if Windows actually asks for it. This setting controls when that happens.

Settings path:  Settings  >  Accounts  >  Sign-in options  >  "If you've been away, when should Windows require you to sign in again?"

| Setting | Recommended value |
| --- | --- |
| Require sign-in after screen turns off | Immediately or 1 minute |
| Screen timeout (on battery) | 5 minutes or less |
| Screen timeout (plugged in) | 10 minutes or less |

![Windows Settings showing sign-in timing set to require sign-in immediately](screenshots/ch2-screen-lock-timing.png)

*Mockup illustration, styled to match Windows 11 — reshoot on a real PC before final layout.*

| ⚠  WARNING If your PC is set to require sign-in only after a long delay — or never — anyone who picks it up while you are away from your desk, even for a few minutes at a cafe or in a shared house, has a direct path to everything you are logged in to. |


## The feature most people have never heard of — BitLocker

BitLocker is full-disk encryption built into most editions of Windows. When it is turned on, everything stored on your PC's drive is scrambled using your sign-in credentials as the key. Without them, the data on the drive is unreadable, even if someone removes the drive entirely and connects it to another computer.

Settings path:  Settings  >  Privacy & Security  >  Device encryption, or search for "BitLocker" in the Start menu.

![Windows Device Encryption settings showing BitLocker turned on](screenshots/ch2-bitlocker.png)

*Mockup illustration, styled to match Windows 11 — reshoot on a real PC before final layout.*

| ℹ  DID YOU KNOW? Not every edition of Windows includes full BitLocker — some editions offer a simpler "Device Encryption" instead, which works similarly but with fewer options. Either one is far better than no encryption at all, and most PCs sold in the last several years support at least the simpler version. |

When you turn on device encryption for the first time, Windows will ask you to save a recovery key — a long code that can unlock your PC if you ever forget your PIN or password. Save this to your Microsoft account when prompted, or write it down and store it somewhere safe, away from the computer itself.


## Quick review — your chapter 2 checklist

| Done | Item |
| --- | --- |
| ☐ | My PIN or password is not a simple sequence or personal detail |
| ☐ | Automatic sign-in (no PIN) is turned off |
| ☐ | Windows Hello is set up, if my PC supports it |
| ☐ | Require sign-in after screen off is set to immediately or 1 minute |
| ☐ | Device encryption or BitLocker is turned on |

With the front door locked, the next chapter covers the master key to everything else on your PC: your Microsoft account.
