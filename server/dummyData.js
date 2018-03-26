import Note from './models/note';

export default function () {
  Note.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = 'This is my note one';
    const content2 = 'This is my note two.';

    const note1 = new Note({ title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const note2 = new Note({ title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    Note.create([note1, note2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
