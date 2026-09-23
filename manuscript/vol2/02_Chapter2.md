Sfinco Guides  ·  Volume 2: MacBook Protection  ·  Chapter 2


# Locking the front door


Your login password, Touch ID, and the encryption setting most people never turn on


Every protection in this book sits behind one gate: the login screen. If someone can pick up your Mac and get straight to your desktop with no password, nothing else in this book matters very much. This chapter covers the three layers that make that gate a genuine barrier, plus one setting that protects your files even if your Mac is physically stolen.


## Layer 1, Your login password


Settings path:  System Settings  >  your name at the top (or Users & Groups)  >  Change Password.

This is where you set or change the password required to log in to your Mac.

Choose a passphrase rather than a short password.  Three or four random words strung together, like "PelicanTaxi42Verandah", are far harder to guess than a shorter password packed with symbols, and much easier for you to remember and type.

![Settings, Users and Groups, Change Password screen for the current user account](screenshots/ch2-change-password.png)

*Mockup illustration, styled to match macOS Sequoia, reshoot on a real Mac before final layout.*

| ⚠  WARNING Do not use: your date of birth, your address, your pet's name, "password", or any word or number someone who knows you could guess. Also avoid reusing your email password as your Mac password, if one is ever exposed, you do not want the other exposed with it. |

Every Mac account should also have a password set. If you have ever set your Mac to "log in automatically" with no password at all, turn that off in Users & Groups now, automatic login means anyone who opens the lid has full access to everything.


## Layer 2, Touch ID


If your Mac has a Touch ID sensor, built into the top-right of the keyboard on most MacBooks made since 2016, it is worth setting up alongside your password, not instead of it.

Settings path:  System Settings  >  Touch ID & Password.

Once set up, Touch ID can be used to:

unlock your Mac without typing your password

approve purchases from the App Store and Apple Books

confirm Apple Pay payments made through Safari

authorise password AutoFill and some system changes, like installing new software

★  TIP:  You can register more than one fingerprint. Adding a second finger, or a trusted family member's finger, if you want them to be able to unlock the Mac too, makes day-to-day unlocking faster without weakening security, since a fingerprint match is still required either way.

If your Mac does not have Touch ID, a strong login password used consistently is just as effective. Touch ID is a convenience layer on top of the password, not a replacement for it.


## Layer 3, Screen lock and auto-lock


A password only protects you if the Mac actually asks for it. Two settings control when that happens.

Settings > Lock Screen  controls how quickly your Mac locks itself after being left idle, and whether a password is required immediately after sleep or the screen saver starts.

| Setting | Recommended value |
| --- | --- |
| Require password after sleep or screen saver begins | Immediately |
| Start screen saver when inactive | 5 minutes or less |
| Turn display off when inactive | 10 minutes or less |

![System Settings, Lock Screen pane showing Require Password set to Immediately](screenshots/ch2-lock-screen-settings.png)

*Mockup illustration, styled to match macOS Sequoia, reshoot on a real Mac before final layout.*

| ⚠  WARNING If your Mac is set to require a password only after a long delay, or never, anyone who picks it up while you are away from your desk, even for a few minutes at a cafe or in a shared house, has a direct path to everything you are logged in to. "Immediately" costs you nothing in convenience and closes this gap completely. |


## The feature most people have never heard of, FileVault


FileVault is full-disk encryption built into every Mac. When it is turned on, everything stored on your Mac's drive is scrambled using your login password as the key. Without that password, the data on the drive is unreadable, even if someone removes the drive entirely and connects it to another computer.

This matters most if your Mac is ever lost or stolen. Without FileVault, a thief with basic technical knowledge can often read your files directly off the drive, bypassing the login screen altogether. With FileVault turned on, that same drive is just scrambled noise without your password.

Settings path:  System Settings  >  Privacy & Security  >  FileVault.

![System Settings, Privacy and Security, FileVault pane showing FileVault turned on](screenshots/ch2-filevault.png)

*Mockup illustration, styled to match macOS Sequoia, reshoot on a real Mac before final layout.*

| ℹ  DID YOU KNOW? FileVault has been available on every Mac since 2003, and on Apple Silicon Macs (the M1, M2, M3, and M4 chips) it runs with almost no effect on speed, since the encryption is handled by dedicated hardware. There is essentially no good reason to leave it turned off. |

When you turn FileVault on for the first time, macOS will ask you to save a recovery key, a long code that can unlock your Mac if you ever forget your password. Write this down and store it somewhere safe, like a password manager or a locked drawer, away from the computer itself. Do not store it in an email to yourself or a note on your desktop.


## Quick review, your chapter 2 checklist


| Done | Item |
| --- | --- |
| ☐ | My login password is a strong passphrase, not a short or guessable password |
| ☐ | Automatic login (no password) is turned off |
| ☐ | Touch ID is set up, if my Mac supports it |
| ☐ | Require password after sleep is set to Immediately |
| ☐ | FileVault is turned on, and I have stored my recovery key somewhere safe |

With the front door locked, the next chapter covers the master key to everything else on your Mac: your Apple ID.
