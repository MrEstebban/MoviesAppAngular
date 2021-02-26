import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/EnCartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];

  constructor(private peliculaService: PeliculasService){
    
    this.peliculaService.getCartelera()
    .subscribe(resp => {
      //console.log(resp.results);

      this.movies = resp.results;
      
    });
  }

  ngOnInit(): void {
  }

}
