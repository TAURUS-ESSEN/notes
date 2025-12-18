export const DEFAULT_NOTES = [
  {
    id: Date.now(),
    title: 'Call to Gloria',
    content: null,
    previewHtml:
      `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, molestias! Also need to ask her about the documents she promised last week, because the deadline is getting close and I can’t wait much longer.</p>`,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, molestias! Also need to ask her about the documents she promised last week, because the deadline is getting close and I can’t wait much longer.',
    status: 'active',
    createdAt: Date.now(),
    updatedAt: null,
    deletedAt: null,
    pinned: false,
    labels: [1]
  },

{
  id: Date.now() + 1,
  title: 'Picnic at Frank’s on November 20.',
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Buy something for the picnic, like meat and beer. Maybe also bring a blanket because last time it was freezing. Frank said he will grill, but trust issues tell me to take some snacks just in case."
          }
        ]
      },
      {
        type: "image",
        attrs: {
          src: "/demo/grill.webp",
          alt: "Picnic"
        }
      }
    ]
  },
  previewHtml: `
    <p>Buy something for the picnic, like meat and beer. Maybe also bring a blanket because last time it was freezing. Frank said he will grill, but trust issues tell me to take some snacks just in case.</p>
    <img src="/demo/picnic.jpg" alt="Picnic">
  `,
  text: 'Buy something for the picnic, like meat and beer. Maybe also bring a blanket because last time it was freezing. Frank said he will grill, but trust issues tell me to take some snacks just in case.',
  status: 'active',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: false,
  labels: [2]
},


  {
    id: Date.now() + 2,
    title: 'I think I’m allergic to garlic and sunlight.',
    content: null,
    previewHtml:
      `<p>I need to think about it — and what those strange bites on my neck are.<br>
      It’s probably nothing serious, but still… maybe I should stop reading horror stories late at night.<br>
      Or maybe finally call a doctor, instead of panicking in silence.<br>
      Also I should track when exactly these symptoms started — was it after that weird dinner last Friday?<br>
      Or after that long walk in the sun?<br>
      Maybe it’s not even allergies — maybe it’s just stress.<br>
      But why the bites then?<br>
      Should write this down somewhere: headaches, weird dizziness, two red marks on the neck, sensitivity to light.<br>
      I hope it’s nothing too dramatic.</p>`,
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
    updatedAt: null,
    deletedAt: null,
    pinned: false,
    labels: []
  },
{
  id: Date.now() + 3,
  title: 'Buy new headphones',
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "My old ones finally died. Need something noise-cancelling. Maybe Sony or Bose? Also should check for Black Friday discounts — last year prices dropped a lot, and I don’t want to overpay again. Comfort matters too."
          }
        ]
      },
      {
        type: "image",
        attrs: {
          src: "/demo/headphone.webp",
          alt: "Headphones"
        }
      }
    ]
  },
  previewHtml: `
    <p>My old ones finally died. Need something noise-cancelling. Maybe Sony or Bose? Also should check for Black Friday discounts — last year prices dropped a lot, and I don’t want to overpay again. Comfort matters too.</p>
    <img src="/demo/headphones.jpg" alt="Headphones">
  `,
  text: 'My old ones finally died. Need something noise-cancelling. Maybe Sony or Bose? Also should check for Black Friday discounts — last year prices dropped a lot, and I don’t want to overpay again. Comfort matters too.',
  status: 'active',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: true,
  labels: [3, 5]
},

  {
    id: Date.now() + 4,
    title: 'Doctor appointment next week',
    content: null,
    previewHtml:
      `<p>Ask about constant headaches. Bring the printed blood tests.<br>
      Also need to mention the weird pressure behind the eyes and the neck stiffness.<br>
      It is probably stress, but I should verify it before ignoring symptoms again.<br>
      Note to self: write down how long this has been happening — I think at least 3 weeks, maybe more.<br>
      Also should ask whether all this could be related to poor sleep or posture.<br>
      And maybe take a list of questions — otherwise I’ll forget everything the moment I enter the doctor’s office.</p>`,
    text: `Ask about constant headaches. Bring the printed blood tests. 
Also need to mention the weird pressure behind the eyes and the neck stiffness. 
It is probably stress, but I should verify it before ignoring symptoms again. 
Note to self: write down how long this has been happening — I think at least 3 weeks, maybe more. 
Also should ask whether all this could be related to poor sleep or posture. 
And maybe take a list of questions — otherwise I’ll forget everything the moment I enter the doctor’s office.`,
    status: 'active',
    createdAt: Date.now(),
    updatedAt: null,
    deletedAt: null,
    pinned: false,
    labels: [4]
  },

{
  id: Date.now() + 5,
  title: 'Plan weekend trip',
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Maybe visit the lake. Buy snacks. Check weather first. If it rains, maybe choose the small hiking trail instead. Also remind Anna to pack extra socks — last time she forgot, and it was a tragedy of national scale."
          }
        ]
      },
      {
        type: "image",
        attrs: {
          src: "/demo/weekend.webp",
          alt: "Weekend trip"
        }
      }
    ]
  },
  previewHtml: `
    <p>Maybe visit the lake. Buy snacks. Check weather first. If it rains, maybe choose the small hiking trail instead. Also remind Anna to pack extra socks — last time she forgot, and it was a tragedy of national scale.</p>
    <img src="/demo/weekend.jpg" alt="Weekend trip">
  `,
  text: 'Maybe visit the lake. Buy snacks. Check weather first. If it rains, maybe choose the small hiking trail instead. Also remind Anna to pack extra socks — last time she forgot, and it was a tragedy of national scale.',
  status: 'archived',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: false,
  labels: [2, 5]
},

  {
  id: Date.now() + 6,
  title: 'Finish the project draft',
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Need to polish the introduction and examples. Deadline is near." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Also rewrite the conclusion — it still feels weak." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Add a section about possible improvements, because the supervisor loves that stuff." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Maybe include an appendix with diagrams?" }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "And check formatting rules again — last time they complained about fonts, spacing, margins, literally everything." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "If possible, run the whole thing through a grammar checker before submitting." }
        ]
      },
      {
        type: "image",
        attrs: {
          src: "/demo/sketch.webp",
          alt: "Project draft"
        }
      }
    ]
  },
  previewHtml: `
    <p>Need to polish the introduction and examples. Deadline is near.</p>
    <p>Also rewrite the conclusion — it still feels weak.</p>
    <p>Add a section about possible improvements, because the supervisor loves that stuff.</p>
    <p>Maybe include an appendix with diagrams?</p>
    <p>And check formatting rules again — last time they complained about fonts, spacing, margins, literally everything.</p>
    <p>If possible, run the whole thing through a grammar checker before submitting.</p>
    <img src="/demo/project.jpg" alt="Project draft">
  `,
  text: `Need to polish the introduction and examples. Deadline is near. 
Also rewrite the conclusion — it still feels weak. 
Add a section about possible improvements, because the supervisor loves that stuff. 
Maybe include an appendix with diagrams? 
And check formatting rules again — last time they complained about fonts, spacing, margins, literally everything. 
If possible, run the whole thing through a grammar checker before submitting.`,
  status: 'active',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: false,
  labels: [3]
},


  {
    id: Date.now() + 7,
    title: 'Try intermittent fasting',
    content: null,
    previewHtml:
      `<p>Just a thought. Maybe from Monday. Or the next Monday. Or after the holidays. Also need to read if it’s actually healthy or just another internet trend with strong opinions and weak science.</p>`,
    text: 'Just a thought. Maybe from Monday. Or the next Monday. Or after the holidays. Also need to read if it’s actually healthy or just another internet trend with strong opinions and weak science.',
    status: 'active',
    createdAt: Date.now(),
    updatedAt: null,
    deletedAt: null,
    pinned: false,
    labels: [4, 5]
  },

{
  id: Date.now() + 8,
  title: 'Birthday gift for Anna',
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Maybe a book or something cozy. Don’t forget to wrap it." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Also check if she mentioned something recently — she usually drops hints without realizing it." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "A warm scarf could also be a good idea if the weather stays cold." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Maybe ask her friends (if I’m brave enough)." }
        ]
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Would be nice to plan something small but meaningful." }
        ]
      },
      {
        type: "image",
        attrs: {
          src: "/demo/gift.webp",
          alt: "Birthday gift"
        }
      }
    ]
  },
  previewHtml: `
    <p>Maybe a book or something cozy. Don’t forget to wrap it.</p>
    <p>Also check if she mentioned something recently — she usually drops hints without realizing it.</p>
    <p>A warm scarf could also be a good idea if the weather stays cold.</p>
    <p>Maybe ask her friends (if I’m brave enough).</p>
    <p>Would be nice to plan something small but meaningful.</p>
    <img src="/demo/gift.jpg" alt="Birthday gift">
  `,
  text: `Maybe a book or something cozy. Don’t forget to wrap it. 
Also check if she mentioned something recently — she usually drops hints without realizing it. 
A warm scarf could also be a good idea if the weather stays cold. 
Maybe ask her friends (if I’m brave enough). 
Would be nice to plan something small but meaningful.`,
  status: 'active',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: true,
  labels: [2,5]
},

  {
    id: Date.now() + 9,
    title: 'Clean the balcony',
    content: null,
    previewHtml:
      `<p>So much dust. Where does it even come from? Should probably move the old boxes out and wipe everything with detergent. Maybe buy a small storage container and finally organize all that junk into something less chaotic.</p>`,
    text: 'So much dust. Where does it even come from? Should probably move the old boxes out and wipe everything with detergent. Maybe buy a small storage container and finally organize all that junk into something less chaotic.',
    status: 'archived',
    createdAt: Date.now(),
    updatedAt: null,
    deletedAt: null,
    pinned: false,
    labels: [6]
  },

{
  id: Date.now() + 10,
  title: 'Buy coffee',
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Buy coffee. Preferably beans, medium roast. Check if there are any discounts, but don’t overthink it this time."
          }
        ]
      },
      {
        type: "image",
        attrs: {
          src: "/demo/coffee.webp",
          alt: "Coffee"
        }
      }
    ]
  },
  previewHtml: `
    <p>Buy coffee. Preferably beans, medium roast. Check if there are any discounts, but don’t overthink it this time.</p>
    <img src="/demo/coffee.webp" alt="Coffee">
  `,
  text: 'Buy coffee. Preferably beans, medium roast. Check if there are any discounts, but don’t overthink it this time.',
  status: 'deleted',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: Date.now(),
  pinned: false,
  labels: []
}, 
{
  id: Date.now() + 11,
  title: 'Minimal workspace',
  content: {
    type: "doc",
    content: [
      { type: "paragraph", content: [{ type: "text", text: "Think about simplifying the workspace: less clutter, better light, one notebook only." }] },
      { type: "image", attrs: { src: "/demo/workspace.webp", alt: "Workspace" } }
    ]
  },
  previewHtml: `
    <p>Think about simplifying the workspace: less clutter, better light, one notebook only.</p>
    <img src="/demo/workspace.webp" alt="Workspace">
  `,
  text: 'Think about simplifying the workspace: less clutter, better light, one notebook only.',
  status: 'active',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: false,
  labels: [3,5]
},
{
  id: Date.now() + 12,
  title: 'Notes app features',
  content: {
    type: "doc",
    content: [
      { type: "paragraph", content: [{ type: "text", text: "Ideas for the app: better search, keyboard shortcuts, export to PDF, markdown mode." }] },
      { type: "image", attrs: { src: "/demo/app.webp", alt: "App ideas" } }
    ]
  },
  previewHtml: `
    <p>Ideas for the app: better search, keyboard shortcuts, export to PDF, markdown mode.</p>
    <img src="/demo/webp.jpg" alt="App ideas">
  `,
  text: 'Ideas for the app: better search, keyboard shortcuts, export to PDF, markdown mode.',
  status: 'archived',
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  pinned: false,
  labels: [5]
},
];


export const DEFAULT_LABELS = [
    {id: 1, name: 'calls', color: 'indigo'},
    {id: 2, name: 'date', color: 'amber'},
    {id: 3, name: 'work', color: 'blue'},
    {id: 4, name: 'health', color: 'green'},
    {id: 5, name: 'ideas', color: 'rose'},
    {id: 6, name: 'home', color: 'amber'}
]

export const DEFAULT_THEME = 'light';