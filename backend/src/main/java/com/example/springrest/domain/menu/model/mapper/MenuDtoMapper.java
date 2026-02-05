package com.example.springrest.domain.menu.model.mapper;

import com.example.springrest.domain.menu.model.dto.MenuRequest;
import com.example.springrest.domain.menu.model.dto.MenuResponse;
import com.example.springrest.domain.menu.model.entity.Menu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

/**
 * 메뉴 DTO 매퍼 (MapStruct)
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MenuDtoMapper {

    /**
     * Request -> Entity
     */
    @Mapping(target = "useYn", defaultValue = "Y")
    Menu toEntity(MenuRequest request);

    /**
     * Entity -> Response DTO
     */
    MenuResponse toResponse(Menu entity);

    /**
     * Entity List -> Response DTO List
     */
    List<MenuResponse> toResponseList(List<Menu> entities);
}
