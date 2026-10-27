/* Test messages for the scam checker, run by eval-checker.js.

   scam: true   = a scam the checker should flag, scam: false = a genuine message it should leave alone.
   gap: true    = a scam we know the checker misses today (so the test doesn't fail on it).
                  If a gap starts being caught the runner tells you to remove the flag.
   falseAlarm: true = a genuine message we know gets wrongly flagged today.

   These are written by hand to look like real Australian scams and real everyday messages.
   They are a regression check and a way to spot gaps, not a measure of real-world accuracy. */

module.exports = [
  // ----- scams -----
  { scam: true, text: "Linkt: You have an unpaid toll of $8.45. Pay within 24 hours to avoid a $150 fine: linkt-pay.info" },
  { scam: true, gap: true, text: "Medicare: you are owed a refund of $212.50. Claim it at medicare-refunds.com" },
  { scam: true, gap: true, text: "Hi Mum, this is my new number, my old phone broke. Save this one and message me on WhatsApp." },
  { scam: true, gap: true, text: "NAB: a payment of $1,490 to J Smith was just made. If this wasn't you, call 1800 555 0123 now." },
  { scam: true, gap: true, text: "StarTrack: your parcel is on hold. Reschedule delivery at startrack-delivery.net" },
  { scam: true, gap: true, text: "I made $12,000 last month with this platform. My mentor can teach you too, message me and I'll show you how." },
  { scam: true, gap: true, text: "Your Windows licence has expired. Call Microsoft support on 1300 000 000 to renew." },
  { scam: true, gap: true, text: "Work from home and earn $500 a day liking videos. No experience needed. Message us on WhatsApp to start." },
  { scam: true, gap: true, text: "Beautiful 2 bed unit, rent only $250 a week. I'm overseas so please send the bond by bank transfer and I'll post you the keys." },
  { scam: true, text: "I have recorded you through your webcam. Send $2000 in bitcoin within 48 hours or I will send the video to all your contacts." },
  { scam: true, text: "AGL: Your bill is overdue. Pay immediately to avoid disconnection: agl-billing.com" },
  { scam: true, text: "Dear customer, your NetBank access has been limited. Click here to restore it: netbank-secure.net" },
  { scam: true, gap: true, text: "To complete verification please send a photo of your driver licence and Medicare card." },
  { scam: true, text: "We have changed our bank details. Please pay the attached invoice to the new account, BSB 062-000 account number 1234 5678." },
  { scam: true, gap: true, text: "You have been selected to win an iPhone 15. Claim now before it expires." },
  { scam: true, text: "I need $3,000 for a plane ticket so I can come and see you. I will pay you back, please keep this between us." },
  { scam: true, gap: true, text: "You are eligible for a $5,000 government grant. Pay a $50 processing fee to release your funds." },
  { scam: true, gap: true, text: "Parking fine notice: scan this QR code to pay the $45 fee today to avoid a late penalty." },
  { scam: true, text: "ATO: you have an unpaid tax debt. A warrant has been issued. Pay now with gift cards." },
  { scam: true, text: "Hi Mum, I lost my phone, this is my new number. I need to pay a bill today but my banking app is locked. Can you transfer $850? Don't tell Dad yet." },
  { scam: true, text: "Hello dear, I am a widow with a large inheritance. Chat with me on Telegram instead of here and I will send you a share." },
  { scam: true, text: "Join our crypto group, guaranteed returns of 40% every week, risk-free." },
  { scam: true, text: "To receive the buyer's payment of $300 you must first upgrade your seller account, click the link to pay the $5 fee." },
  { scam: true, text: "Netflix: your payment was declined. Update your payment details within 24 hours to avoid suspension: netflix-billing.co" },
  { scam: true, text: "Your wallet has been suspended. Verify your seed phrase immediately to restore access." },

  // ----- genuine messages (some deliberately look a bit like scams) -----
  { scam: false, falseAlarm: true, text: "CommBank: A payment of $50.00 to Sam Taylor was made from your account ending 1234." },
  { scam: false, falseAlarm: true, text: "Westpac: Your card ending 4521 was used at Bunnings for $64.20." },
  { scam: false, falseAlarm: true, text: "ANZ: Your new card has been sent and should arrive in 5 to 7 business days." },
  { scam: false, falseAlarm: true, text: "AusPost: your parcel is out for delivery and will arrive today." },
  { scam: false, text: "Hi Pat, it's Chloe. Can you pick me up from the station at 5? Thanks!" },
  { scam: false, text: "Your doctor's appointment is tomorrow at 9:30am. Reply C to confirm or call us on 5449 1234." },
  { scam: false, text: "Reminder: bins are collected tomorrow morning." },
  { scam: false, text: "Your electricity bill of $212.40 is due 3 November. You can view it in the AGL app." },
  { scam: false, text: "Dinner at ours on Saturday at 6? Bring nothing, we have it all covered." },
  { scam: false, text: "Your Coles order will arrive between 2pm and 4pm today." },
  { scam: false, text: "Happy birthday Nan! Hope you have a lovely day, love Mia xx" },
  { scam: false, text: "Your payment of $35 to Noosa Council was received. Thank you." },
  { scam: false, text: "Mum, I'm sending you the photos on WhatsApp tonight." },
  { scam: false, falseAlarm: true, text: "Don't tell Mum, but I'll send her flowers for Mother's Day." },
  { scam: false, text: "Don't tell anyone, but I booked us a surprise trip to Noosa for your 70th!" },
  { scam: false, falseAlarm: true, text: "Let's use WhatsApp instead of texting, it's easier for the whole book club." },
  { scam: false, text: "Your Netflix plan will move to the new price next month. No action needed." },
  { scam: false, text: "Thanks for your payment of $120. Your receipt is attached." },
  { scam: false, text: "Mum, can you send me the recipe for your lamb roast?" },
  { scam: false, text: "The council reminds residents that rates are due on 15 November. Pay online at noosa.qld.gov.au" },
  { scam: false, text: "Telstra: Your bill is ready. Log in to the My Telstra app to view it." },
  { scam: false, text: "Your appointment at Noosa Dental is confirmed for Tuesday 14 October at 10am." },
  { scam: false, text: "I just paid the plumber $240 by bank transfer, let me know when you're home so he can come back." },
  { scam: false, text: "Your parcel from Amazon has been delivered. Total $29.99." },
  { scam: false, falseAlarm: true, text: "Gift cards for the grandkids are half price at Coles this week, if you're after something easy." },
];
