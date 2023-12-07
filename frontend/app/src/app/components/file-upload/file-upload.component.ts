import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FileService } from '../../services/file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFiles: File[] = [];
  uploadProgress: number = 0;
  uploadMessage = '';
  errorMessage = '';
  showColumnModal = false;
  userDefinedColumns = { activityColumn: '', timestampColumn: '', caseKeyColumn: '' }; // Added caseKeyColumn

  constructor(private fileService: FileService, private router: Router) {}

  onFilesSelected(event: any) {
    this.selectedFiles = [];
    for (let file of event.target.files) {
      if (file.type !== 'text/csv') {
        this.errorMessage = 'Only CSV files are allowed.';
        return;
      }
      this.selectedFiles.push(file);
    }
    this.showColumnModal = true; // Show column modal
    this.errorMessage = ''; // Clear previous error message
  }

  onModalSubmit() {
    this.showColumnModal = false;
    this.uploadFiles();
  }

  uploadFiles() {
    if (!this.selectedFiles.length) {
      this.errorMessage = 'Please select at least one file.';
      return;
    }

    this.selectedFiles.forEach(file => {
      // Pass the additional parameters to the uploadFile method
      this.fileService.uploadFile(file, this.userDefinedColumns.activityColumn, this.userDefinedColumns.timestampColumn, this.userDefinedColumns.caseKeyColumn).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploadMessage = 'File uploaded successfully!';
          }
        },
        error => {
          this.errorMessage = 'Failed to upload file.';
        }
      );
    });
  }
}
