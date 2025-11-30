

export const DEFAULT_NOTES = [
    {id: Date.now(),  title: 'Call to Gloria', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, molestias!', status: 'active', createdAt: Date.now(), updatedAt:'', deletedAt: '', labels: [1]}, 
    {id: Date.now()+1,  title: 'Picnic at Frank’s on November 20.', text: 'Buy something for the picnic, like meat and beer.', status: 'active',  createdAt: Date.now(), updatedAt:'', deletedAt: '', labels: [2]},
    {id: Date.now()+2,  title: 'I think I’m allergic to garlic and sunlight.', text: 'I need to think about it — and what those strange bites on my neck are.', status: 'archived',  createdAt: Date.now(), updatedAt:'', deletedAt: '', labels: [1,2]}
];

export const DEFAULT_LABELS = [
    {id: 1, name: 'calls', color: 'red'}, {id: 2, name: 'daten', color: 'green'}, {id: 3, name: 'work', color: 'blue'}
]