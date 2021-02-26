import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/EnCartelera-response';




@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() peliculas: Movie[];

  constructor( private router: Router) { }

  ngOnInit(): void {
    console.log(this.peliculas);
    
  }

  seleccionarPelicula(IdPelicula: number){
    //console.log(IdPelicula);

    this.router.navigate(['pelicula', IdPelicula]);
    
  }


}
