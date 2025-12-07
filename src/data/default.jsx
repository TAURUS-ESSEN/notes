export const DEFAULT_NOTES = [
    {
        id: Date.now(),
        title: 'Call to Gloria',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, molestias! Also need to ask her about the documents she promised last week, because the deadline is getting close and I can’t wait much longer.',
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [1]
    },

    {
        id: Date.now()+1,
        title: 'Picnic at Frank’s on November 20.',
        text: 'Buy something for the picnic, like meat and beer. Maybe also bring a blanket because last time it was freezing. Frank said he will grill, but trust issues tell me to take some snacks just in case.',
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [2]
    },

    {
        id: Date.now()+2,
        title: 'I think I’m allergic to garlic and sunlight.',
        text: `I need to think about it — and what those strange bites on my neck are. 
It’s probably nothing serious, but still… maybe I should stop reading horror stories late at night. 
Or maybe finally call a doctor, instead of panicking in silence. 
Also I should track when exactly these symptoms started — was it after that weird dinner last Friday? 
Or after that long walk in the sun? 
Maybe it’s not even allergies — maybe it’s just stress. 
But why the bites then? 
Should write this down somewhere: headaches, weird dizziness, two red marks on the neck, sensitivity to light. 
I hope it’s nothing too dramatic.`,
        status: 'archived',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [1,2]
    },

    {
        id: Date.now()+3,
        title: 'Buy new headphones',
        text: 'My old ones finally died. Need something noise-cancelling. Maybe Sony or Bose? Also should check for Black Friday discounts — last year prices dropped a lot, and I don’t want to overpay again. Comfort matters too.',
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: true,
        labels: [3,5]
    },

    {
        id: Date.now()+4,
        title: 'Doctor appointment next week',
        text: `Ask about constant headaches. Bring the printed blood tests. 
Also need to mention the weird pressure behind the eyes and the neck stiffness. 
It is probably stress, but I should verify it before ignoring symptoms again. 
Note to self: write down how long this has been happening — I think at least 3 weeks, maybe more. 
Also should ask whether all this could be related to poor sleep or posture. 
And maybe take a list of questions — otherwise I’ll forget everything the moment I enter the doctor’s office.`,
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [4]
    },

    {
        id: Date.now()+5,
        title: 'Plan weekend trip',
        text: 'Maybe visit the lake. Buy snacks. Check weather first. If it rains, maybe choose the small hiking trail instead. Also remind Anna to pack extra socks — last time she forgot, and it was a tragedy of national scale.',
        status: 'archived',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [2,5]
    },

    {
        id: Date.now()+6,
        title: 'Finish the project draft',
        text: `Need to polish the introduction and examples. Deadline is near. 
Also rewrite the conclusion — it still feels weak. 
Add a section about possible improvements, because the supervisor loves that stuff. 
Maybe include an appendix with diagrams? 
And check formatting rules again — last time they complained about fonts, spacing, margins, literally everything. 
If possible, run the whole thing through a grammar checker before submitting.`,
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [3]
    },

    {
        id: Date.now()+7,
        title: 'Try intermittent fasting',
        text: 'Just a thought. Maybe from Monday. Or the next Monday. Or after the holidays. Also need to read if it’s actually healthy or just another internet trend with strong opinions and weak science.',
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [4,5]
    },

    {
        id: Date.now()+8,
        title: 'Birthday gift for Anna',
        text: `Maybe a book or something cozy. Don’t forget to wrap it. 
Also check if she mentioned something recently — she usually drops hints without realizing it. 
A warm scarf could also be a good idea if the weather stays cold. 
Maybe ask her friends (if I’m brave enough). 
Would be nice to plan something small but meaningful.`,
        status: 'active',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: true,
        labels: [2]
    },

    {
        id: Date.now()+9,
        title: 'Clean the balcony',
        text: 'So much dust. Where does it even come from? Should probably move the old boxes out and wipe everything with detergent. Maybe buy a small storage container and finally organize all that junk into something less chaotic.',
        status: 'archived',
        createdAt: Date.now(),
        updatedAt: '',
        deletedAt: '',
        pinned: false,
        labels: [3]
    }
];



export const DEFAULT_LABELS = [
    {id: 1, name: 'calls', color: 'red'},
    {id: 2, name: 'daten', color: 'green'},
    {id: 3, name: 'work', color: 'blue'},
    {id: 4, name: 'health', color: 'purple'},
    {id: 5, name: 'ideas', color: 'orange'}
]