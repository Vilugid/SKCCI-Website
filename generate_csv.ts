import fs from 'fs';
import { generate365Plan } from './src/bibleData';

const plan = generate365Plan();
let csvContent = 'Day,Old Testament,New Testament\n';
plan.forEach(day => {
  csvContent += `${day.day},"${day.ot}","${day.nt}"\n`;
});

fs.writeFileSync('public/365_bible_reading_guide.csv', csvContent);
console.log('CSV generated successfully.');
