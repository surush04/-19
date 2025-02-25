import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-class6',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './class6.component.html',
  styleUrl: './class6.component.css'
})
export class Class6Component {
  questions: any[] = [
    {
      question: 'Кадом шохи дарахт дар Тоҷикистон бештар меафзояд?',
      options: ['Борука', 'Зардолу', 'Сағанақ'],
      answer: 'Зардолу'
    },
    {
      question: 'Кадом ҳайвон бештар дар кӯҳистон зиндагӣ мекунад?',
      options: ['Шир', 'Гӯсфанд', 'Ҳайвонҳои ҳавоии'],
      answer: 'Гӯсфанд'
    },
    {
      question: 'Вақти Олимпиада кай баргузор мешавад?',
      options: ['Ҳар 4 сол', 'Ҳар 2 сол', 'Ҳар 6 сол'],
      answer: 'Ҳар 4 сол'
    },
    {
      question: 'Кадом кӯҳҳо дар Тоҷикистон баландтарин аст?',
      options: ['Фанский', 'Памир', 'Алто'],
      answer: 'Памир'
    },
    {
      question: 'Кадом мӯҳтавои хуби шахсиро ҳисобида мешавад?',
      options: ['Зудкорӣ', 'Тарзи ҳаёти солим', 'Тамокукашӣ'],
      answer: 'Тарзи ҳаёти солим'
    },
    {
      question: 'Кадом кас меравад дар бахши аниматсия кор кунад?',
      options: ['Сиёсатшинос', 'Механик', 'Аниматор'],
      answer: 'Аниматор'
    },
    {
      question: 'Кадом ҳайвони хушбӯй аст?',
      options: ['Шерх', 'Гул', 'Шутурмурғ'],
      answer: 'Гул'
    },
    // Саволҳои математика
    {
      question: '1 + 1 чӣ аст?',
      options: ['2', '3', '4'],
      answer: '2'
    },
    {
      question: '10 * 5 чӣ медиҳад?',
      options: ['50', '100', '10'],
      answer: '50'
    },
    {
      question: '100 / 25 чӣ аст?',
      options: ['2', '4', '5'],
      answer: '4'
    },
    {
      question: '25 + 75 чӣ аст?',
      options: ['100', '110', '120'],
      answer: '100'
    },
    {
      question: 'Каҷ кардани радиуси 3 ба муодилаи паём медиҳад?',
      options: ['9', '6', '12'],
      answer: '9'
    }
  ];

  currentQuestionIndex: number = 0;
  userAnswer: string = '';
  resultMessage: string = '';
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  checkAnswer(selectedOption: string): void {
    if (selectedOption === this.questions[this.currentQuestionIndex].answer) {
      this.resultMessage = 'Ҷавоб дуруст аст! Ба саволи баъдӣ рафта метавонед.';
      this.correctAnswers++;
    } else {
      this.resultMessage = 'Ҷавоб нодуруст аст! Бозӣ ба охир расид.';
      this.incorrectAnswers++;
    }

    this.currentQuestionIndex++;
    
    if (this.currentQuestionIndex >= this.questions.length) {
      this.resultMessage = `Шумо бозӣ ба охир расидед! Дуруст: ${this.correctAnswers}, Нодуруст: ${this.incorrectAnswers}`;
    }
  }

  restartGame(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.resultMessage = '';
  }
}
