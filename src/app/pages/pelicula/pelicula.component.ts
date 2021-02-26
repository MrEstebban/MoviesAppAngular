import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/EnCartelera-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public movie: Movie;
  public cast: Cast[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicio: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.servicio.getMovie(id),
      this.servicio.getCast(id),
    ]).subscribe(([pelicula, cast]) => {
        if (!pelicula) {
          this.router.navigate(['/home']);
          return;
        } else {
          this.movie = pelicula;
          this.cast = cast;
        }
    });

    //console.log(id);

    // this.servicio.getMovie(id).subscribe(resp => {

    //   if(!resp){

    //     this.router.navigate(['/home']);
    //     return;

    //   }else{

    //     this.movie = resp;
    //   }

    // })

    // this.servicio.getCast(id).subscribe(resp => {

    //   if(!resp){

    //     this.router.navigate(['/home']);
    //     return;

    //   }else{

    //     this.cast = resp;

    //   }

    // });
  }

  regresar() {
    this.location.back();
  }
}
