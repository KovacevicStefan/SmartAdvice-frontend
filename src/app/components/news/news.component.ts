import { Component } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { News } from 'src/app/model/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
  
})
export class NewsComponent {
  displayedColumns = ['naslov', 'datum', 'autor'];
  dataSource: News[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private service: NewsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.service.getAllNews().subscribe(data => {
      this.dataSource = data
        .filter(newsItem => newsItem.naslov !== 'Tatjana Vit' && newsItem.naslov !== 'Ivana Sredojević')
        .sort((a, b) => b.id - a.id);
    });
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  get paginatedData(): News[] {
    return this.dataSource.slice(this.startIndex, this.endIndex);
  }

  onPageChange(event: any) {
    this.currentPage = event;
  }
}
