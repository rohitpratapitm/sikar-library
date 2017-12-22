import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '../common/common.module';
import { PlayerService } from './player/player.service';
import { PlayerComponent } from './player/players-grid.component';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [PlayerComponent],
    exports: [PlayerComponent]

})
export class NBAModule {

}
