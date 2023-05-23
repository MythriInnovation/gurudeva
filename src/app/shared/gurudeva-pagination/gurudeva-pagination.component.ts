import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gurudeva-pagination',
  templateUrl: './gurudeva-pagination.component.html',
  styleUrls: ['./gurudeva-pagination.component.scss']
})
export class GurudevaPaginationComponent {
  @Input() items: any[] = [];
  @Input() pageSize = 5;
  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.items?.length / this.pageSize);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
