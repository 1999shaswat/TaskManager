import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from 'src/app/task.service';
import {Task} from "src/app/models/task.model";
import {List} from 'src/app/models/list.model';

@Component( {
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
} )
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  constructor ( private taskService: TaskService, private route: ActivatedRoute, private router: Router ) {
    this.lists = [];
    this.tasks = [];
  }

  ngOnInit (): void {

    this.route.params.subscribe( ( params: Params ) => {
      if ( Object.keys( params ).length === 0 ) return;
      this.taskService.getTasks( params.listId ).subscribe( ( tasks: any ) => {
        this.tasks = tasks;
      } );
    } );

    this.taskService.getLists().subscribe( ( lists: any ) => {
      this.lists = lists;
    } );
  }

  toggleCompleted ( task: Task ) {
    this.taskService.updateTask( task ).subscribe( ( res: any ) => {
      console.log( res.message );
      task.completed = !task.completed;
    } );
  }

}
