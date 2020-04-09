import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from '../../../components/posts/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
 
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static:true})paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
constructor(private postSvc: PostService){}

  ngOnInit(){
    this.postSvc.getAllPosts().subscribe(posts => (this.dataSource.data = posts));
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post:PostI){
    console.log('Edit post',post);
  }
  onDeletePost(post:PostI){
    console.log('Delete post', post);
    Swal.fire({
      title:`Are you sure?`,
      text:`You won't be able to revert this!`,
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'$d33',
      confirmButtonText:'Yes, delete it',
    }).then(result => {
      if (result.value){
        //quiere borrar
        console.log('Delete');
        Swal.fire('Deleted!', 'Your post has been deleted', 'success');
      }
  });
  }
  onNewPost(){
    console.log('New Post');
  }

}